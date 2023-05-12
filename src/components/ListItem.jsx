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
	// const [alertMessage, setAlertMessage] = useState(''); // Don't need state anymore with just one message popup

	const dialogRef = useRef();

	function confirmDelete() {
		//I changed the name of our function to be more descriptive. The actual item deletion happens now in the handleYesClick
		// setAlertMessage("Are you sure you want to delete this?"); //Put this message back directly into the JSX return statement
		dialogRef.current.showModal();
	}

	//HANDLER FUNCTION FOR YES BUTTON
	function handleYesClick() {
		deleteItem(listToken, itemId); //This should be "deleteItem" -- our function imported from firebase.
		dialogRef.current.close();
	}

	//HANDLER FUNCTION FOR NO BUTTON
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
			<button type="button" onClick={confirmDelete}>
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
