import './ListItem.css';

export function ListItem({
	name,
	isDefaultChecked,
	itemId,
	setIsChecked,
	setCheckedItemId,
	onDeleteClick,
}) {
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
			<button
				type="button"
				onClick={() => {
					onDeleteClick(itemId);
				}}
			>
				Delete
			</button>
		</li>
	);
}
