import { useState } from 'react';
import { addItem } from '../api/firebase.js';

export function AddItem({ listToken }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);
	const [itemAdded, setItemAdded] = useState(false);
	const [error, setError] = useState(false);

	// TODO: dynamically pass in the list token so item is added to correct list
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
		//		const existingItem = existing item, converted to lower case and spaces removed
		//		if (updatedItem === existingItem) {
		// 			alert user;
		// 			return;}
		let updatedUserInput = itemName.replace(/\s/g, '').toLowerCase();
		let noPunctuationUserInput = updatedUserInput.replace(/[^\w\s]|_/g, '');
		console.log(noPunctuationUserInput);
		// 		else
		try {
			await addItem(listToken, {
				itemName,
				daysUntilNextPurchase,
			});
			setItemAdded(true);
			setError(false);
		} catch (e) {
			setError(true);
			setItemAdded(false);
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
			{itemAdded && <p>Your item has been added.</p>}
			{error && <p>Oh no, something went wrong.</p>}
		</>
	);
}
