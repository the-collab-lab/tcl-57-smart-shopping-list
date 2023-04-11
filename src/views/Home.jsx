import { Navigate } from 'react-router-dom';
import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import * as React from 'react';

export function Home({ listToken, setListToken }) {
	console.log(listToken); // prints 'undefined' even when a token exists in localStorage
	const [tokenExists, setTokenExists] = React.useState(
		listToken ? true : false,
	);

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
			{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
		</div>
	);
}
