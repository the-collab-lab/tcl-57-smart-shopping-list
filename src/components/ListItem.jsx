import './ListItem.css';
import { deleteItem } from '../api/firebase.js';
import { useRef } from 'react';
import { useState } from 'react';

export function ListItem({
	name,
	isDefaultChecked,
	itemId,
	setIsChecked,
	setCheckedItemId,
	listToken,
}) {
	const [alertMessage, setAlertMessage] = useState('');

	const dialogRef = useRef(null);

	function deleteItemFromList() {
		setAlertMessage('Are you sure you want to delete this?');
		dialogRef.current.showModal();
	}

	//HANDLER FUNCTION FOR NO BUTTON
	//HANDLER FUNCTION FOR YES BUTTON

	// async function deleteItemFromList() {
	// 	if (
	// 		window.confirm(
	// 			'Do you really want to delete this item? Click OK to confirm.',
	// 		)
	// 	) {
	// 		await deleteItem(listToken, itemId);
	// 		window.alert('Your item was deleted.');

	// 	} else {
	// 		window.alert('No items have been deleted');
	// 	}
	// }

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
			<dialog ref={dialogRef}>{alertMessage}</dialog>
		</li>
	);
}
