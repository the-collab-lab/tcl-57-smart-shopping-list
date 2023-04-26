import './ListItem.css';

export function ListItem({
	name,
	dateLastPurchased,
	itemId,
	setIsChecked,
	setCheckedItemId,
}) {
	function clickHandler(event, itemId) {
		setIsChecked(event.target.checked);
		setCheckedItemId(itemId);
	}

	function checkDefault() {
		if (!dateLastPurchased) return false;
		const dayInMilliseconds = 24 * 60 * 60 * 1000;
		const date = dateLastPurchased.toDate();
		const currentDate = new Date();
		const timeElapsed = currentDate - date;

		if (timeElapsed > dayInMilliseconds) return false;
		else return true;
	}

	return (
		<li className="ListItem">
			<input
				type="checkbox"
				id={itemId}
				onClick={(event) => {
					clickHandler(event, itemId);
				}}
				defaultChecked={checkDefault()}
			/>
			<label htmlFor={itemId}>{name}</label>
		</li>
	);
}
