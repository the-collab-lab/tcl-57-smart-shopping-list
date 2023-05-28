import { colors } from './colors';

export const palette = {
	primary: {
		dark: '#5B7963',
		main: '#82AD8E',
		light: '#9BBDA4',
		contrastText: '#E9E4D3',
		// contrastText: '#FFFFF0', // ivory
		// contrastText: '#FFFFFF'  // white
	},
	secondary: {
		dark: '#A99346',
		main: '#FFFFF0',
		light: '#F4DB83',
		contrastText: '#000000',
	},
	background: {
		default: colors.grey[900],
		alt: colors.grey[800],
	},
};

const fontFamily = `Roboto, sans-serif`;

export const typography = {
	fontFamily: fontFamily,
	fontSize: 12,
	h1: {
		fontFamily: fontFamily,
		fontSize: 40,
	},
	h2: {
		fontFamily: fontFamily,
		fontSize: 32,
	},
	h3: {
		fontFamily: fontFamily,
		fontSize: 24,
	},
	h4: {
		fontFamily: fontFamily,
		fontSize: 20,
	},
	h5: {
		fontFamily: fontFamily,
		fontSize: 16,
	},
	h6: {
		fontFamily: fontFamily,
		fontSize: 14,
	},
};
