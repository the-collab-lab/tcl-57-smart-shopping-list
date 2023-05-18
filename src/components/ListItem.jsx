import './ListItem.css';

export function ListItem({
	name,
	isDefaultChecked,
	itemId,
	urgency,
	setIsChecked,
	setCheckedItemId,
	onDeleteClick,
}) {
	const iconsByUrgency = {
		soon: '🟠',
		'kind of soon': '🟡',
		'not soon': '🟢',
		inactive: '⚫️',
		overdue: '🔴',
	};

	const urgencyIcon = iconsByUrgency[urgency];

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
