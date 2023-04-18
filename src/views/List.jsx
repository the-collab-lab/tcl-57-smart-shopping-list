import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<>
			<form>
				<label htmlFor="search-filter">Item name:</label>
				<input
					type="text"
					id="search-filter"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
			<ul>
				{data
					.filter((item) => {
						if (searchTerm === '') {
							return item;
						} else if (
							item.name.toLowerCase().includes(searchTerm.toLowerCase())
						) {
							return item;
						}
					})
					.map((item) => (
						<ListItem name={item.name} key={item.id} />
					))}
			</ul>
		</>
	);
}
