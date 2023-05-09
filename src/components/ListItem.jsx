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

	/* PSEUDOCODE FOR ISSUE #12:
	 *	1. Render different background color for each item based on urgency as provided by item.urgency property.
	 *		ex: pseudo-element or style={backgroundColor: {data.urgency}} or add className for background color.
	 *	2. Refactor UI for better accessibility.
	 */

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
