import { Navigate } from 'react-router-dom';
import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import * as React from 'react';
import streamListItems from '../api';
export function Home({ setListToken }) {
	const [token, setToken] = React.useState('');
	const [tokenExists, setTokenExists] = React.useState(false);

	function handleClick() {
		const token = generateToken();
		setListToken(token);
		setTokenExists(true);
	}

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button type="button" onClick={handleClick}>
				Create New List
			</button>

			<form>
				<label htmlFor="tokenInput">Have a token already? </label>

				<input
					id="tokenInput"
					onChange={(event) => setToken(event.target.value)}
				/>

				<button type="submit">Submit</button>
			</form>

			{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
		</div>
	);
}
