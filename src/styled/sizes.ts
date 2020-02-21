export enum WIDTHS {
	XS = 320,
	S = 480,
	M = 768,
	L = 992,
	XL = 1200
}

export enum FONT_SIZES {
	H1 = 40,
	H2 = 35,
	H3 = 28,
	P = 16,
}

export enum LINE_HEIGHTS {
	DEFAULT = 1.5,
}

export enum VERTICAL_RHYTHMS {
	H1 = FONT_SIZES.H1 * LINE_HEIGHTS.DEFAULT,
	H2 = FONT_SIZES.H2 * LINE_HEIGHTS.DEFAULT,
	H3 = FONT_SIZES.H3 * LINE_HEIGHTS.DEFAULT,
	P = FONT_SIZES.P * LINE_HEIGHTS.DEFAULT,
}
