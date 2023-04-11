import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home() {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button>Create New List</button>
		</div>
	);
}
