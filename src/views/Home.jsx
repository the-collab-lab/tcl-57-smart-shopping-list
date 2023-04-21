import { Navigate } from 'react-router-dom';
import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import * as React from 'react';
import { validateToken } from '../api/firebase';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function Home({ setListToken }) {
	const [userListNameInput, setUserListNameInput] = React.useState('');
	const [tokenExists, setTokenExists] = React.useState(false);

	function handleClick() {
		const token = generateToken();
		setListToken(token);
		setTokenExists(true);
	}

	async function handleSumbit(e) {
		e.preventDefault();
		const isValid = await validateToken(userListNameInput);
		if (isValid) {
			setListToken(userListNameInput);
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
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button type="button" onClick={handleClick}>
				Create new list
			</button>
			<p> - or - </p>
			<form onSubmit={handleSumbit}>
				<label htmlFor="tokenInput">
					enter three word token to view existing list:
				</label>

				<input
					type="text"
					id="tokenInput"
					onChange={(event) => setUserListNameInput(event.target.value)}
					required
				/>

				<button type="submit">Submit</button>
			</form>

			{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
		</div>
	);
}
