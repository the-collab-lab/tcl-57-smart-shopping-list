import './ListItem.css';
import { deleteItem } from '../api/firebase.js';
import { useRef } from 'react';

export function ListItem({
	name,
	isDefaultChecked,
	itemId,
	setIsChecked,
	setCheckedItemId,
	listToken,
}) {
	const dialogRef = useRef();

	function openModal() {
		dialogRef.current.showModal();
	}

	function handleYesClick() {
		deleteItem(listToken, itemId);
		dialogRef.current.close();
	}

	function handleNoClick() {
		dialogRef.current.close();
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
			<button type="button" onClick={openModal}>
				Delete
			</button>
			<dialog ref={dialogRef}>
				<p>Are you sure you want to remove "{name}" from your list?</p>
				<button onClick={handleYesClick}>Yes</button>
				<button onClick={handleNoClick}>No</button>
			</dialog>
		</li>
	);
}
