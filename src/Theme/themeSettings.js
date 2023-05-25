import { colors } from './colors';

const palette = {
	primary: {
		dark: colors.primary[200],
		main: colors.primary[300],
		light: colors.primary[800],
	},
	secondary: {
		dark: colors.secondary[200],
		main: colors.secondary[500],
		light: colors.secondary[800],
	},
	neutral: {
		dark: colors.grey[100],
		main: colors.grey[200],
		mediumMain: colors.grey[300],
		medium: colors.grey[400],
		light: colors.grey[700],
	},
	background: {
		default: colors.grey[900],
		alt: colors.grey[800],
	},
};

const fontFamily = `Roboto, sans-serif`;

const typography = {
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

// mui theme settings
export const themeSettings = { palette, typography };
