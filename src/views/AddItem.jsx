import { useState } from 'react';
import { addItem } from '../api/firebase.js';
import {
	Button,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
	TextField,
	Box,
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
			<Box display="flex" justifyContent="center" minHeight="100vh">
				<FormControl>
					<h2>Add an item to your shopping list:</h2>
					<TextField
						id="item-name-input"
						label="Item name"
						variant="outlined"
						onChange={(e) => setItemName(e.target.value)}
					/>
					<RadioGroup>
						<FormLabel>How soon will you buy this again?</FormLabel>
						<FormControlLabel
							value="soon"
							control={<Radio />}
							label="Soon"
							onChange={() => setDaysUntilNextPurchase(7)}
							checked={daysUntilNextPurchase === 7}
						/>
						<FormControlLabel
							value="kind of soon"
							control={<Radio />}
							label="Kind of soon"
							onChange={() => setDaysUntilNextPurchase(14)}
							checked={daysUntilNextPurchase === 14}
						/>
						<FormControlLabel
							value="not soon"
							control={<Radio />}
							label="Not soon"
							onChange={() => setDaysUntilNextPurchase(30)}
							checked={daysUntilNextPurchase === 30}
						/>
					</RadioGroup>

					<Button
						type="submit"
						variant="contained"
						size="large"
						onClick={handleSubmit}
					>
						Add item
					</Button>
					{/* TODO: we could change item added message to a toast message, alert, timeout or use third-party library for this message. */}
					{error ? (
						<p>Oh no, something went wrong.</p>
					) : (
						<p>{userAlertMessage}</p>
					)}
				</FormControl>
			</Box>
		</>
	);
}
