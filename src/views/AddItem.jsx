import { useState } from 'react';
import { addItem } from '../api/firebase.js';
import {
	Button,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
} from '@mui/material';

export function AddItem({ listToken, data }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);
	const [error, setError] = useState(false);
	const [userAlertMessage, setUserAlertMessage] = useState('');
	const normalizedItemNameRegex = /[\s\W]|_+|s$/g; //Targets all spaces, non-letter characters, and 's' character at the end of the string

	const handleSubmit = async (e) => {
		e.preventDefault();
		const normalizedItemName = itemName
			.toLowerCase()
			.replace(normalizedItemNameRegex, '');

		if (normalizedItemName === '') {
			setUserAlertMessage('Please enter an item name.');
			return;
		}

		for (const item of data) {
			const existingItem = item.name;
			const updatedExistingItem = existingItem
				.toLowerCase()
				.replace(normalizedItemNameRegex, '');

			if (normalizedItemName === updatedExistingItem) {
				setUserAlertMessage(
					`The item '${existingItem}' is already on your list.`,
				);
				return;
			}
		}
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
			{/* <FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChange}
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
  </RadioGroup>
</FormControl> */}
			<FormControl>
				{/* <form onSubmit={handleSubmit}> */}
				<label htmlFor="item-name-input">Item name:</label>
				<input
					type="text"
					id="item-name-input"
					onChange={(e) => setItemName(e.target.value)}
				/>
				<RadioGroup>
					{/* <fieldset> */}
					<FormLabel
					// sx={{
					// 	color: white,
					// }}
					>
						How soon will you buy this again?
					</FormLabel>
					{/* <legend>How soon will you buy this again?</legend> */}
					<FormControlLabel
						value="soon"
						control={<Radio />}
						label="Soon"
						onChange={() => setDaysUntilNextPurchase(7)}
						checked={daysUntilNextPurchase === 7}
					/>
					{/* <input
						type="radio"
						id="soon"
						onChange={() => setDaysUntilNextPurchase(7)}
						checked={daysUntilNextPurchase === 7}
					/>
					<label htmlFor="soon">Soon</label> <br /> */}
					<FormControlLabel
						value="kind of soon"
						control={<Radio />}
						label="Kind of soon"
						onChange={() => setDaysUntilNextPurchase(14)}
						checked={daysUntilNextPurchase === 14}
					/>
					{/* 
					<input
						type="radio"
						id="kind-of-soon"
						onChange={() => setDaysUntilNextPurchase(14)}
						checked={daysUntilNextPurchase === 14}
					/>
					<label htmlFor="kind-of-soon">Kind of soon</label> <br /> */}
					<FormControlLabel
						value="not soon"
						control={<Radio />}
						label="Not soon"
						onChange={() => setDaysUntilNextPurchase(30)}
						checked={daysUntilNextPurchase === 30}
					/>
					{/* <input
						type="radio"
						id="not-soon"
						onChange={() => setDaysUntilNextPurchase(30)}
						checked={daysUntilNextPurchase === 30}
					/>
					<label htmlFor="not-soon">Not soon</label> */}
					{/* </fieldset> */}
				</RadioGroup>
				{/* <input type="submit" value="Add item"> */}

				<Button
					type="button"
					variant="contained"
					size="large"
					onClick={handleSubmit}
				>
					Add item
				</Button>
				{/* </input> */}
				{/* </form> */}
			</FormControl>
			{/* TODO: we could change item added message to a toast message, alert, timeout or use third-party library for this message. */}
			{error ? <p>Oh no, something went wrong.</p> : <p>{userAlertMessage}</p>}
		</>
	);
}
