import React from 'react';
import Head from 'next/head';
import portfolioItems from '../../data/portfolio-items';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import HomeHeadBanner from '../../components/HomeHeadBanner';
import { PortfolioContainer } from '../../styled/portfolio.style';
import PortfolioItem from '../../components/PortfolioItem';
import { MY_NAME } from '../../constants';

export const Portfolio = () => {
	return (
		<main className="main">
			<Head>
				<title>{MY_NAME} | Front End Developer</title>
			</Head>
			<HomeHeadBanner hasColor={false}>
				<h1>A Sample of My Work</h1>
			</HomeHeadBanner>
			<div className="body-slot">
				<PortfolioContainer>
					<Head>
						<title>Development Portfolio | Luke Boyle</title>
					</Head>
					<MaxWidthContainer className="inner">
						{portfolioItems.map(PortfolioItem)}
					</MaxWidthContainer>
				</PortfolioContainer>
			</div>
		</main>
	);
};

export default Portfolio;
