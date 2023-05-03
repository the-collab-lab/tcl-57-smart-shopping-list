import { useState } from 'react';
import { addItem } from '../api/firebase.js';

export function AddItem({ listToken, data }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);
	const [error, setError] = useState(false);
	const [userAlertMessage, setUserAlertMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Pseudocode:
		// 1. If user's item name input is empty, alert user and don't save input to database.
		// 		if (user item name input === '') {
		// 			alert user;
		// 			return;}
		// 2. If user's item name input is identical to an existing item, alert user and don't save input to database.
		//		if (user item name input === existing item) {
		//			alert user;
		// 			return;}
		// 3. If user's item name input has unconventional title case or spacing but still matches an existing item, alert user OR user confirms and don't save input to datebase.
		//		const updatedItem = user item input, converted to lower case and spaces removed
		// 		(ex: "App les" becomes "apples", "root beer" becomes "rootbeer")
		const normalizedItemName = itemName.replace(/[\s\W]|_+/g, '').toLowerCase();
		//		const existingItem = existing item, converted to lower case and spaces removed
		//		if (updatedItem === existingItem) {
		// 			alert user;
		// 			return;}
		//FILTER THROUGH THE DATA ARRAY AND MAKE EACH ITEM LOWERCASE WITHOUT SPACES AND PUNCTUATION. SAVE TO A NEW VARIABLE.
		for (const item of data) {
			const existingItem = item.name;
			const updatedExistingItem = existingItem
				.replace(/[\s\W]|_+/g, '')
				.toLowerCase();
			if (normalizedItemName === '') {
				setUserAlertMessage('Please enter an item name.');
				return;
			}
			if (normalizedItemName === updatedExistingItem) {
				setUserAlertMessage(`${existingItem} is already on your list.`);
				return;
			}
		}
		// 		else
		try {
			await addItem(listToken, {
				itemName,
				daysUntilNextPurchase,
			});
			setUserAlertMessage(`${itemName} has been added to your list.`);
			setError(false);
		} catch (e) {
			setError(true);
			setUserAlertMessage('');
		}
	};
	// TODO: implement clear input after user adds item to list
	return (
		<>
			<h2>Add an item to your shopping list</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="item-name-input">Item name:</label>
				<input
					type="text"
					id="item-name-input"
					onChange={(e) => setItemName(e.target.value)}
				/>
				<fieldset>
					<legend>How soon will you buy this again?</legend>
					<input
						type="radio"
						id="soon"
						onChange={() => setDaysUntilNextPurchase(7)}
						checked={daysUntilNextPurchase === 7}
					/>
					<label htmlFor="soon">Soon</label> <br />
					<input
						type="radio"
						id="kind-of-soon"
						onChange={() => setDaysUntilNextPurchase(14)}
						checked={daysUntilNextPurchase === 14}
					/>
					<label htmlFor="kind-of-soon">Kind of soon</label> <br />
					<input
						type="radio"
						id="not-soon"
						onChange={() => setDaysUntilNextPurchase(30)}
						checked={daysUntilNextPurchase === 30}
					/>
					<label htmlFor="not-soon">Not soon</label>
				</fieldset>

				<input type="submit" value="Add item" />
			</form>
			{/* TODO: we could change item added message to a toast message, alert, timeout or use third-party library for this message. */}
			{error ? <p>Oh no, something went wrong.</p> : <p>{userAlertMessage}</p>}
		</>
	);
}
