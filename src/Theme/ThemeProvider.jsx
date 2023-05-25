import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';

import { palette, typography } from './themeSettings';

/**
 * A custom theme provider that wraps Material UI's theme provider. It creates
 * an MUI theme that respects the user's system preferences.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const ThemeProvider = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = useMemo(
		() =>
			responsiveFontSizes(
				createTheme({
					palette: {
						...palette,
						mode: prefersDarkMode ? 'dark' : 'light',
					},
					typography,
				}),
			),
		[prefersDarkMode],
	);

	return (
		<MUIThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MUIThemeProvider>
	);
};
