import './ListItem.css';
import { deleteItem } from '../api/firebase.js';

export function ListItem({
	name,
	isDefaultChecked,
	itemId,
	setIsChecked,
	setCheckedItemId,
	listToken,
}) {
	function deleteItemFromList() {
		if (window.confirm('Do you really want to delete this item?')) {
			window.alert('Your item will now be deleted');
			deleteItem(listToken, itemId);
		} else {
			window.alert('No items have been deleted');
		}
	}

	function clickHandler(event, itemId) {
		setIsChecked(event.target.checked);
		setCheckedItemId(itemId);
	}

	return (
		<li className="ListItem">
			<input
				type="checkbox"
				id={itemId}
				onClick={(event) => {
					clickHandler(event, itemId);
				}}
				defaultChecked={isDefaultChecked}
			/>
			<label htmlFor={itemId}>{name}</label>
			<button type="button" onClick={deleteItemFromList}>
				Delete
			</button>
		</li>
	);
}
