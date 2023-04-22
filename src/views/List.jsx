import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchTerm, setSearchTerm] = useState('');

	/* TO DO: Make separate resuable input component with a filter feature*/

	const filteredList = data.filter((item) => {
		if (searchTerm === '') {
			return item;
		} else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
			return item;
		}
	});

	const renderedList = filteredList.map((item) => (
		<ListItem name={item.name} key={item.id} />
	));

	const clearSearchField = (e) => {
		e.preventDefault();
		setSearchTerm('');
	};

	return (
		<>
			<form onSubmit={clearSearchField}>
				<label htmlFor="search-filter">Item name:</label>
				<input
					type="text"
					id="search-filter"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type="submit"> X </button>
			</form>
			<ul>{renderedList}</ul>
		</>
	);
}
