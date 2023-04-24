import { Navigate } from 'react-router-dom';
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

	return (
		<div className="Home">
			<h2>Welcome to your Smart Shopping List! </h2>{' '}
			<h3>
				You can create a new shopping list, or type in a token to view an
				existing list.
			</h3>
			<button type="button" onClick={handleClick}>
				create new list
			</button>
			<p> - or - </p>
			<form onSubmit={handleSumbit}>
				<label htmlFor="tokenInput">enter three word token:</label>
				<div>
					<input
						type="text"
						id="tokenInput"
						onChange={(event) => setUserTokenInput(event.target.value)}
						required
					/>

					<button type="submit">submit</button>
				</div>
			</form>
			{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
		</div>
	);
}
