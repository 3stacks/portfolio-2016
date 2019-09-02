import React from 'react';
import styled from 'styled-components';
import { MaxWidthContainer } from '../styled/utils';

const StyledFooter = styled.div`
    height: 60px;

    & .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        font-size: 1.4rem;
    
        a {
            color: white;
        
            &:hover {
                color: white;
            }
        }
    }
    
    & .copyright {
        color: white;
        font-size: 1.4rem;
    }
`;

export default function Footer() {
	return (
		<StyledFooter>
			<MaxWidthContainer className="inner">
				<small className="copyright">
					&copy; Luke Boyle 93' til infinity
				</small>
				<a className="copyright" href="/sitemap.xml">
					Sitemap
				</a>
			</MaxWidthContainer>
		</StyledFooter>
	);
}
