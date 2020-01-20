import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout/layout';
import mozillaSrc from '../assets/img/mozilla.gif';
import rcaSrc from '../assets/img/rca.gif';
import berrySrc from '../assets/img/berry.gif';
import styled from 'styled-components';
import { MaxWidthContainer } from '../styled/utils';

const SupportContainer = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    list-style: none;
    margin: 0 0 30px;
    padding: 0;

    img {
        max-width: 100%;
    }
`;

export default class About extends React.Component {
    render() {
        return (
            <Layout isHome={false} slug="about">
                <Helmet>
                    <title>About | Luke Boyle</title>
                </Helmet>
                <MaxWidthContainer isSmall className="about-main">
                    <h2>
                        Working at{' '}
                        <span
                            style={{
                                textTransform: 'uppercase',
                                color: '#52B5E6'
                            }}
                        >
                            Belong
                        </span>
                    </h2>
                    <p>Front-end developer and practice lead.</p>
                    <h2>Quick facts:</h2>
                    <ul>
                        <li>
                            Co-founder of{' '}
                            <a
                                href="https://stak.digital"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                Stak Digital
                            </a>
                        </li>
                        <li>Open-source/data privacy advocate</li>
                        <li>Experienced with React, Angular 1.x, and Vue.js</li>
                        <li>
                            Experienced with AWS services including Lambda, EC2,
                            API Gateway
                        </li>
                    </ul>
                    <h2>Links</h2>
                    <ul>
                        <li>
                            LinkedIn:{' '}
                            <a
                                href="https://www.linkedin.com/in/luke-boyle"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://www.linkedin.com/in/luke-boyle
                            </a>
                        </li>
                        <li>
                            Personal Github:{' '}
                            <a
                                href="https://github.com/3stacks"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://github.com/3stacks
                            </a>
                        </li>
                        <li>
                            Stak Github:{' '}
                            <a
                                href="https://github.com/stak-digital"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://github.com/stak-digital
                            </a>
                        </li>
                        <li>
                            npm:{' '}
                            <a
                                href="https://npmjs.com/~lukeboyle"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://npmjs.com/~lukeboyle
                            </a>
                        </li>
                        <li>
                            Stack Overflow:{' '}
                            <a
                                href="https://stackoverflow.com/users/story/5602665"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://stackoverflow.com/users/story/5602665
                            </a>
                        </li>
                        <li>
                            For project enquiries:{' '}
                            <a
                                href="https://stak.digital/contact"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://stak.digital/contact
                            </a>
                        </li>
                    </ul>
                    <h2>Proudly supporting</h2>
                    <SupportContainer>
                        <li>
                            <img
                                src={mozillaSrc}
                                alt="The Mozilla Foundation"
                            />
                        </li>
                        <li>
                            <img src={rcaSrc} alt="Red Cross Australia" />
                        </li>
                        <li>
                            <img src={berrySrc} alt="Berry Street" />
                        </li>
                    </SupportContainer>
                    <h2>Tracking &amp; privacy</h2>
                    <p>
                        The site uses DNS level analytics provided by Cloudflare
                        to give me traffic stats and geographical information. I
                        don't use Google analytics or any other tracking
                        software.
                    </p>
                </MaxWidthContainer>
            </Layout>
        );
    }
}
