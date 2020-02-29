import styled from 'styled-components';
import { WIDTHS } from '../../styled/sizes';
import { bp } from '../../styled/mixins';
import { getFontSize } from '../../styled/utils';

export const StyledBlockQuote = styled.blockquote`
	display: inline-flex;
	${getFontSize(1.9, 1.5)}
	font-size: 1.9rem;
	line-height: 1.5;
	font-family: 'Publico', sans-serif;

	${bp(
		WIDTHS.M,
		`
		font-size: 2.4rem;
	`
	)}

	p {
		margin: 0;
	}

	& .icon {
		width: 20px;
		height: 20px;
		transform: translateY(-10px);

		&:first-of-type {
			margin-right: 5px;
		}

		&:last-of-type {
			margin-left: 5px;
		}
	}
`;
