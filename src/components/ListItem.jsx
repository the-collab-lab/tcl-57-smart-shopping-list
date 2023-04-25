import './ListItem.css';

// Passing to each list item the setter function "setCheckedItem"

export function ListItem({ name, itemId, setCheckedItemId }) {
	return (
		<li className="ListItem">
			<input
				type="checkbox"
				id={itemId}
				onChange={() => setCheckedItemId(itemId)}
			/>
			<label htmlFor={itemId}>{name}</label>
		</li>
	);
}
