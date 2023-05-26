/* eslint-disable jsx-a11y/label-has-associated-control */
import { Navigate } from 'react-router-dom';
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	Stack,
} from '@mui/material';

import retro from '../retro.png';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { useState } from 'react';
import { validateToken } from '../api/firebase';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import Modal from '../views/Modal';

export function Home({ setListToken }) {
	const [userTokenInput, setUserTokenInput] = useState('');
	const [tokenExists, setTokenExists] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

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

	return (
		<Stack direction="column" justifyContent="center" alignItems="center">
			<img
				src={retro}
				className="logo"
				alt="logo"
				height="284"
				width="284"
			></img>

			<Stack gap={2} alignItems="center">
				<Typography variant="h1" marginBottom={1}>
					Welcome to your Smart Shopping List!
				</Typography>
				<Typography variant="h2">
					You can create a new shopping list, or type in a token to view an
					existing list.
				</Typography>
				<Button
					type="button"
					variant="contained"
					size="large"
					sx={{
						fontSize: '2em',
						minWidth: '20ch',
					}}
					onClick={handleClick}
				>
					Create list
				</Button>
			</Stack>

			<Typography variant="h2">
				<p> - or - </p>
			</Typography>

			<Box component="form" onSubmit={handleSumbit} sx={{ width: '100%' }}>
				<Stack gap={1} alignItems="center">
					<Typography variant="h2">
						<label htmlFor="tokenInput">Three word token:</label>
					</Typography>
					<TextField
						type="text"
						id="tokenInput"
						onChange={(event) => setUserTokenInput(event.target.value)}
						required
						inputProps={{
							sx: {
								fontSize: '2em',
								width: '20ch',
								maxWidth: '100dvw',
							},
						}}
					/>

					<Button
						variant="contained"
						size="large"
						type="submit"
						sx={{
							fontSize: '2em',
							minWidth: '20ch',
						}}
					>
						Join List
					</Button>
				</Stack>
			</Box>
			{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
		</Stack>
	);
}
