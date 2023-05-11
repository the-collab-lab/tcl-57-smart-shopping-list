import './ListItem.css';

export function ListItem({
	name,
	isDefaultChecked,
	itemId,
	urgency,
	setIsChecked,
	setCheckedItemId,
}) {
	const urgencyIcon =
		urgency === 'overdue'
			? '🔴'
			: urgency === 'soon'
			? '🟠'
			: urgency === 'kind of soon'
			? '🟡'
			: urgency === 'not soon'
			? '🟢'
			: '⚫️';

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
			<label htmlFor={itemId}>{`${name} (${urgencyIcon} ${urgency})`}</label>
		</li>
	);
}
