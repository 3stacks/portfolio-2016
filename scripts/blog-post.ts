import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import camelCase from 'lodash/camelCase';
import shell from 'shelljs';
import sortBy from 'lodash/sortBy';
import { getMarkupFromMarkdown, renderer } from './utils/renderer';
import getFileNameFromPath from '@lukeboyle/get-filename-from-path';
import {
	generateBlogPageComponent,
	generateBlogPostComponent,
	IMetaData,
	isNotDirectory,
	resolveBlogPosts
} from './utils/blog';
import { getCanonicalURLFromString } from './utils/string';

function generateComponent(acc, curr) {
	const fileName = getFileNameFromPath(curr.path);
	const camelCaseName = camelCase(fileName);
	const postContents = curr.contents;
	let imports = `
import React from 'react';
import BlogPost from '../../../../components/BlogPost';
import BlockQuote from '../../../../components/BlockQuote';`;

	renderer.image = function(href, title, text) {
		const rawFilename = getFileNameFromPath(href);
		const imageName = `${camelCase(
			rawFilename.slice(0, rawFilename.indexOf('.'))
		)}Src`;

		imports = `${imports}\nimport ${imageName} from '${
			href.includes('http')
				? href
				: `../..${href.replace('/blog-posts', '')}`
		}'`;

		return `<img src={${imageName}} alt="${text}"/>`;
	};

	const postStatusIndex = postContents.indexOf('post_status');
	const afterPostStatusContents = postContents.slice(postStatusIndex);
	const almostPostStatus = afterPostStatusContents
		.slice(afterPostStatusContents.indexOf('|'))
		.slice(2);
	const postStatus = almostPostStatus.slice(0, almostPostStatus.indexOf(' '));

	const canonicalUrl = getCanonicalURLFromString(postContents) || '';

	const lines = postContents.split('\n');
	// TODO: fuck this off
	let tableMode = false;
	const contents = lines.reduce((acc, curr, index) => {
		if (curr.slice(0, 2) === '# ') {
			return Object.assign({}, acc, {
				title: curr.slice(2)
			});
		}

		// Table Start
		if (curr.includes('| Metadata name |')) {
			tableMode = true;
		}

		if (tableMode === true) {
			if (curr.slice(0, 2) === '| ') {
				const lineWithoutFirstDelimeter = curr.slice(2);
				const key = lineWithoutFirstDelimeter.slice(
					0,
					lineWithoutFirstDelimeter.indexOf(' | ')
				);
				const value = lineWithoutFirstDelimeter.slice(
					lineWithoutFirstDelimeter.indexOf(' | ') + 3,
					-2
				);

				return Object.assign({}, acc, {
					metaData: Object.assign({}, acc.metaData, {
						[key.trim()]: value.trim()
					})
				});
			} else {
				tableMode = false;
			}
		}

		return Object.assign({}, acc, {
			contents: `${acc.contents || ''}\n${curr}`
		});
	}, {});

	if (postStatus !== 'draft') {
		const postContents = getMarkupFromMarkdown(contents.contents);
		let parsedContents = postContents;

		if (contents.metaData.post_type === 'top_list') {
			imports = `${imports}\nimport { AlbumBlock } from '../../../../styled/music.style';`;
			const rawParts = postContents.split('<h2>');
			const parts = rawParts.slice(1, rawParts.length);
			parsedContents = parts.reduce((acc, curr) => {
				const albumTitle = curr.split('</h2>')[0];
				const artistStart = curr.split('<h3>');
				const artist = artistStart[artistStart.length - 1].split(
					'</h3>'
				)[0];
				const imageStart = curr.split('<img ');
				const imageBits = imageStart[imageStart.length - 1].split(
					'/>'
				)[0];
				const snippet = curr.split('/></p>')[1];
				return `${acc}\n<AlbumBlock>
	<h2 className="title">${albumTitle}</h2>
	<h3 className="artist">${artist}</h3>
	<img ${imageBits} />
	${
		snippet === '\n'
			? '\n'
			: `<div className="snippet">
		${curr.split('/></p>')[1]}
	</div>\n`
	}
</AlbumBlock>
`;
			}, '');
		}

		acc.push({
			path: curr.path,
			fileName,
			componentName:
				camelCaseName[0].toUpperCase() + camelCaseName.slice(1),
			publishDate: new Date(contents.metaData.post_date).getTime(),
			postCategory: contents.metaData.post_category || 'blog',
			postType: contents.metaData.post_type || 'text-post',
			postAuthor: contents.metaData.post_author,
			postTitle: contents.metaData.post_title,
			snippet: contents.metaData.snippet,
			component: generateBlogPostComponent(
				imports,
				camelCaseName,
				parsedContents,
				contents.metaData,
				canonicalUrl
			)
		});
	}

	return acc;
}

(() => {
	glob('blog-posts/**/*.md', {}, async (err, files) => {
		const blogPosts = files.filter(isNotDirectory).reduce((acc, curr) => {
			acc.push({
				path: curr,
				contents: fs.readFileSync(curr, { encoding: 'utf-8' })
			});

			return acc;
		}, []);

		const reversedComponents = blogPosts.reduce(generateComponent, []);

		const componentsSortedByDate = sortBy(
			reversedComponents,
			'publishDate'
		);
		const musicPosts = componentsSortedByDate.filter(component => {
			return component.postCategory === 'music';
		});

		shell.rm('-rf', path.resolve(`${__dirname}/../src/pages/blog-posts`));

		reversedComponents.forEach(component => {
			shell.mkdir(
				'-p',
				path.resolve(
					`${__dirname}/../src/pages/${component.path.replace(
						`/${component.fileName}`,
						''
					)}`
				)
			);
			fs.writeFileSync(
				path.resolve(
					`${__dirname}/../src/pages/${component.path.replace(
						'.md',
						'.tsx'
					)}`
				),
				component.component
			);
		});

		fs.writeFileSync(
			path.resolve(`${__dirname}/../src/data/music-posts.json`),
			JSON.stringify(
				musicPosts
					.reverse()
					.map(
						({
							postTitle,
							path,
							fileName,
							componentName,
							component,
							...others
						}) => ({
							path,
							fileName,
							componentName,
							postTitle,
							...others
						})
					),
				null,
				'\t'
			)
		);

		const sidebarData = await resolveBlogPosts();
		const components = componentsSortedByDate.reverse();
		const postsPerPage = 6;
		const pages = components.reduce((acc, curr, index) => {
			const pagesSoFar = Object.keys(acc);

			const lastPage =
				parseInt(pagesSoFar[pagesSoFar.length - 1], 10) || 0;

			if (index % postsPerPage === 0) {
				const newPage = lastPage + 1;

				return Object.assign({}, acc, {
					[newPage]: [curr]
				});
			}

			return Object.assign({}, acc, {
				[lastPage]: [...acc[lastPage], curr]
			});
		}, {});

		Object.keys(pages).forEach((key, index) => {
			const rootDir = index === 0 ? '../..' : '../..';
			const blogPage = generateBlogPageComponent(
				rootDir,
				key,
				index,
				sidebarData,
				pages
			);

			const fileName =
				index === 0
					? `${__dirname}/../src/pages/blog/index.tsx`
					: `${__dirname}/../src/pages/blog/${index}.tsx`;

			fs.copySync(
				`${__dirname}/../blog-posts/images`,
				`${__dirname}/../src/pages/blog-posts/images`
			);
			console.log(`Writing to ${fileName}`);
			fs.writeFileSync(path.resolve(fileName), blogPage);
		});
	});
})();
