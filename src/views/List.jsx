import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [filter, setFilter] = useState('');

	return (
		<>
			<form>
				<label htmlFor="search-filter">Item name:</label>
				<input
					type="text"
					id="search-filter"
					onChange={(e) => setFilter(e.target.value)}
				/>
			</form>
			<ul>
				{data.map((item) => (
					<ListItem name={item.name} key={item.id} />
				))}
			</ul>
		</>
	);
}
