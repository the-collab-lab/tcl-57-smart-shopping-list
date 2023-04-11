import { useState } from 'react';
import { addItem } from '../api/firebase.js';

export function AddItem() {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addItem('my test list', {
				itemName,
				daysUntilNextPurchase,
			});
		} catch (e) {
			console.error(e.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="item-name-input">
				Item name:
				<input
					type="text"
					id="item-name-input"
					placeholder="eggs"
					onChange={(e) => setItemName(e.target.value)}
				></input>
			</label>

			<fieldset>
				<p>How soon will you buy this again?</p>
				<input
					type="radio"
					id="soon"
					name="time"
					onChange={() => setDaysUntilNextPurchase(7)}
				/>
				<label htmlFor="soon">Soon</label> <br />
				<input
					type="radio"
					id="kind-of-soon"
					name="time"
					onChange={() => setDaysUntilNextPurchase(14)}
				/>
				<label htmlFor="kind-of-soon">Kind of soon</label> <br />
				<input
					type="radio"
					id="not-soon"
					name="time"
					onChange={() => setDaysUntilNextPurchase(30)}
				/>
				<label htmlFor="not-soon">Not soon</label>
			</fieldset>

			<input type="submit" id="Add Item" />
		</form>
	);
}
