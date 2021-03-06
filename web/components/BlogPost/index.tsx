import * as React from 'react';
import formatDate from 'date-fns/format';
import Head from 'next/head';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import HomeHeadBanner from '../HomeHeadBanner';
import { StyledPost } from './style';

export const BlogPost = ({
	children,
	publishDate,
	author,
	title,
	seo: { canonical, pageTitle, pageDescription }
}: {
	children: any;
	publishDate: string;
	author: string;
	title: string;
	fileName: string;
	seo: {
		canonical?: string;
		pageTitle: string;
		pageDescription: string;
	};
}) => {
	return (
		<main className="main">
			<Head>
				{canonical !== '' && <link rel="canonical" href={canonical} />}
				{pageDescription && (
					<meta name="description" content={pageDescription} />
				)}
				<meta name="author" content={author} />
				<title>{pageTitle || title} | Luke Boyle</title>
			</Head>
			<StyledPost>
				<HomeHeadBanner hasColor>
					<h1>{title}</h1>
				</HomeHeadBanner>
				<MaxWidthContainer className="content">
					<p>
						Posted by {author} on the{' '}
						<time className="date" dateTime={publishDate}>
							{formatDate(publishDate, 'Do of MMMM, YYYY')}
						</time>
					</p>
					<>{children}</>
				</MaxWidthContainer>
			</StyledPost>
		</main>
	);
};

export default BlogPost;
