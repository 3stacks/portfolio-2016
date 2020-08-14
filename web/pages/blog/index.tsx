import * as React from 'react';
import { initializeApollo } from '../../lib/apolloClient';
import { gql } from '@apollo/client';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { BodyWrapper, MainHeader } from '../../styled/music.style';
import HomeHeadBanner from '../../components/HomeHeadBanner/HomeHeadBanner';
import { PAGES } from '../../constants';
import Layout from '../../components/Layout/Layout';
import BlogPreview from '../../components/BlogPreview/BlogPreview';
import PostArchive from '../../components/PostArchive';
import { useMemo } from 'react';
import safeGet from 'lodash/get';

const BlogPage = (props: {
    initialApolloState: { ROOT_QUERY: { blogPosts: any[] } };
}) => {
    console.log(props);
    const { blogPosts } = props.initialApolloState.ROOT_QUERY;

    if (!blogPosts) {
        return null;
    }

    const archiveData = useMemo(() => {
        return blogPosts.reduce((acc, post) => {
            const pathParts = post.path.replace('blog-posts/', '').split('/');
            const year = pathParts[0];
            const month = pathParts[1];

            console.log(post, year, month);
            return {
                ...acc,
                [year]: {
                    ...acc[year],
                    [month]: [
                        ...safeGet(acc, [year, month], []),
                        {
                            slug: post.slug,
                            path: post.path,
                            title: post.metaData.post_title
                        }
                    ]
                }
            };
        }, {});
    }, [blogPosts]);
    const pagePosts = blogPosts.slice(0, 6);

    return (
        <Layout
            slug="blog"
            pageName={PAGES.BLOG}
            headChildren={() => (
                <HomeHeadBanner hasColor>
                    <h1 className="site-name">Boyleing Point</h1>
                    <p>Psychotic ramblings about technology</p>
                </HomeHeadBanner>
            )}
        >
            <MaxWidthContainer>
                <BodyWrapper>
                    <div className="left">
                        <MainHeader>Post Archive</MainHeader>
                        <PostArchive data={archiveData} />
                    </div>
                    <div>
                        {pagePosts.map(post => {
                            console.log(post);
                            return (
                                <BlogPreview
                                    key={post.path}
                                    author={post.metaData.post_author}
                                    publishDate={post.metaData.post_date}
                                    title={post.metaData.post_title}
                                    slug={`/${post.path.replace('.md', '')}`}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: post.snippet
                                        }}
                                    />
                                </BlogPreview>
                            );
                        })}
                    </div>
                </BodyWrapper>
            </MaxWidthContainer>
        </Layout>
    );
};

export const ALL_POSTS_QUERY = gql`
    query {
        blogPosts {
            path
            slug
            snippet
            metaData {
                post_title
                post_date
                post_author
            }
        }
    }
`;

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: ALL_POSTS_QUERY
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1
    };
}

export default BlogPage;