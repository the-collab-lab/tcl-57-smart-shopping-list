import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home({ setListToken }) {
	function handleClick() {
		const token = generateToken();
		setListToken(token);
	}

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button type="button" onClick={handleClick}>
				Create New List
			</button>
		</div>
	);
}
