import COLORS from 'colors';

export function putInRows(itemsPerRow, spacingSize) {
	return `
		width: calc(${100 / itemsPerRow}% - ${ (spacingSize / itemsPerRow) * (itemsPerRow - 1)});
		height: calc(${100 / itemsPerRow}% - ${ (spacingSize / itemsPerRow) * (itemsPerRow - 1)});
		margin-bottom: $spacing-size;
	`;
}

export const background = `
	background: {
		color: #34495e;
		image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 1000'%3E%3Cg %3E%3Ccircle fill='%2334495e' cx='50' cy='0' r='50'/%3E%3Cg fill='%23364c61' %3E%3Ccircle cx='0' cy='50' r='50'/%3E%3Ccircle cx='100' cy='50' r='50'/%3E%3C/g%3E%3Ccircle fill='%23384e65' cx='50' cy='100' r='50'/%3E%3Cg fill='%23395168' %3E%3Ccircle cx='0' cy='150' r='50'/%3E%3Ccircle cx='100' cy='150' r='50'/%3E%3C/g%3E%3Ccircle fill='%233b536b' cx='50' cy='200' r='50'/%3E%3Cg fill='%233d566f' %3E%3Ccircle cx='0' cy='250' r='50'/%3E%3Ccircle cx='100' cy='250' r='50'/%3E%3C/g%3E%3Ccircle fill='%233f5972' cx='50' cy='300' r='50'/%3E%3Cg fill='%23415b76' %3E%3Ccircle cx='0' cy='350' r='50'/%3E%3Ccircle cx='100' cy='350' r='50'/%3E%3C/g%3E%3Ccircle fill='%23435e79' cx='50' cy='400' r='50'/%3E%3Cg fill='%2345617d' %3E%3Ccircle cx='0' cy='450' r='50'/%3E%3Ccircle cx='100' cy='450' r='50'/%3E%3C/g%3E%3Ccircle fill='%23476380' cx='50' cy='500' r='50'/%3E%3Cg fill='%23486684' %3E%3Ccircle cx='0' cy='550' r='50'/%3E%3Ccircle cx='100' cy='550' r='50'/%3E%3C/g%3E%3Ccircle fill='%234a6987' cx='50' cy='600' r='50'/%3E%3Cg fill='%234c6c8b' %3E%3Ccircle cx='0' cy='650' r='50'/%3E%3Ccircle cx='100' cy='650' r='50'/%3E%3C/g%3E%3Ccircle fill='%234e6e8e' cx='50' cy='700' r='50'/%3E%3Cg fill='%23507192' %3E%3Ccircle cx='0' cy='750' r='50'/%3E%3Ccircle cx='100' cy='750' r='50'/%3E%3C/g%3E%3Ccircle fill='%23527495' cx='50' cy='800' r='50'/%3E%3Cg fill='%23547799' %3E%3Ccircle cx='0' cy='850' r='50'/%3E%3Ccircle cx='100' cy='850' r='50'/%3E%3C/g%3E%3Ccircle fill='%2356799d' cx='50' cy='900' r='50'/%3E%3Cg fill='%23587ca0' %3E%3Ccircle cx='0' cy='950' r='50'/%3E%3Ccircle cx='100' cy='950' r='50'/%3E%3C/g%3E%3Ccircle fill='%235a7fa4' cx='50' cy='1000' r='50'/%3E%3C/g%3E%3C/svg%3E");
		attachment: fixed;
		size: contain;
		position: center;
	}
`;

export function bp(size, content) {
	return `
		@media (min-width: ${size}px) {
			${content}
		};
	`
}

export const triangle = `
	content: "";
	position: absolute;
	left: 0;
	display: block;
	z-index: 1;
	width: 0;
`;

export const topTriangle = `
	position: relative;
	&:before {
		${triangle}
		top: 0;
		transform: translateY(-50px);
		border: {
			top: 50px solid transparent;
			left: 110vw solid $primary-color;
		}
	}
`;

export function bottomTriangle(height = 0, color = COLORS.PRIMARY_GRADIENT_LIGHT) {
	return `
		position: relative;
		&:after {
			${triangle}
			height: ${height};
			bottom: 0;
			transform: translateY(50px);
			border: {
				bottom: 50px solid transparent;
				right: 110vw solid ${color};
			}
		}
	`;
}