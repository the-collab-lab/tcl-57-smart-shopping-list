import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import { updateItem } from '../api/firebase.js';

export function List({ data, listToken }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [checkedItemId, setCheckedItemId] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	/*TO DO: Implement guard against user's accidental click. Currently the updated fields (dateLastPurchased and totalPurchases) in Firestore 
	persist when user unchecks item.*/
	useEffect(() => {
		if (isChecked) {
			updateItem(listToken, checkedItemId);
		}
	}, [isChecked, listToken, checkedItemId]);

	const filteredList = data.filter((item) => {
		if (searchTerm === '') {
			return item;
		} else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
			return item;
		}
	});

	const renderedList = filteredList.map((item) => (
		<ListItem
			name={item.name}
			isDefaultChecked={item.isDefaultChecked}
			key={item.id}
			itemId={item.id}
			setCheckedItemId={setCheckedItemId}
			setIsChecked={setIsChecked}
		/>
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
				<button type="submit"> clear </button>
			</form>
			<ul>{renderedList}</ul>
		</>
	);
}
