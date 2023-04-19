import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchTerm, setSearchTerm] = useState('');

	const filterList = data.filter((item) => {
		if (searchTerm === '') {
			return item;
		} else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
			return item;
		}
	});

	const renderList = filterList.map((item) => (
		<ListItem name={item.name} key={item.id} />
	));

	const handleClick = () => setSearchTerm('');

	return (
		<>
			<form>
				<label htmlFor="search-filter">Item name:</label>
				<input
					type="text"
					id="search-filter"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button onClick={handleClick}> X </button>
			</form>
			<ul>{renderList}</ul>
		</>
	);
}
