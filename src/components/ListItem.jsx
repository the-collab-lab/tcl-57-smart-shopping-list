import './ListItem.css';

export function ListItem({ name, itemId, setIsChecked, setCheckedItemId }) {
	function clickHandler(event, itemId) {
		setIsChecked(event.target.checked);
		setCheckedItemId(itemId);
	}

	return (
		<li className="ListItem">
			<input
				type="checkbox"
				id={itemId}
				onClick={(event) => clickHandler(event, itemId)}
			/>
			<label htmlFor={itemId}>{name}</label>
		</li>
	);
}
