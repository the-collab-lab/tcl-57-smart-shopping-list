import { Navigate } from 'react-router-dom';
import {
	Box,
	Button,
	Grid,
	ThemeProvider,
	Typography,
	createTheme,
} from '@mui/material';
import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { useState } from 'react';
import { validateToken } from '../api/firebase';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function Home({ setListToken }) {
	const [userTokenInput, setUserTokenInput] = useState('');
	const [tokenExists, setTokenExists] = useState(false);

	function handleClick() {
		const token = generateToken();
		setListToken(token);
		setTokenExists(true);
	}

	async function handleSumbit(e) {
		e.preventDefault();
		const isValid = await validateToken(userTokenInput);
		if (isValid) {
			setListToken(userTokenInput);
			setTokenExists(true);
		} else {
			Toastify({
				text: 'Sorry, this list does not exist.',
				position: 'center',
				gravity: 'top',
				duration: 3000,
			}).showToast();
		}
	}

	const mainTheme = createTheme({
		typography: {
			fontFamily: 'Times New Roman',
		},
		palette: {
			primary: {
				main: '#F298BF',
				background: {
					default: '#F298BF',
				},
			},
		},
	});

	return (
		<ThemeProvider theme={mainTheme}>
			<div className="Home">
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="30vh"
				>
					Welcome to your Smart Shopping List!{' '}
				</Box>
				<Grid
					container
					spacing={10}
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					<Grid item sx={{ width: '50%' }}>
						<Typography variant="subtitle1">
							You can create a new shopping list, or type in a token to view an
							existing list.
						</Typography>
						<Button
							type="button"
							variant="contained"
							size="large"
							onClick={handleClick}
						>
							Create new list
						</Button>
						<p> - or - </p>
						<form onSubmit={handleSumbit}>
							<label htmlFor="tokenInput">Three word token:</label>
							<div>
								<input
									type="text"
									id="tokenInput"
									onChange={(event) => setUserTokenInput(event.target.value)}
									required
								/>

								<button type="submit">Submit</button>
							</div>
						</form>
					</Grid>
					<Grid item>
						<Typography variant="h1"> item 2 </Typography>
					</Grid>
				</Grid>

				{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
			</div>
		</ThemeProvider>
	);
}
