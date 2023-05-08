import './ListItem.css';

export function ListItem({
	name,
	isDefaultChecked,
	itemId,
	setIsChecked,
	setCheckedItemId,
}) {
	//1. Add a button inside the <li> element for each list item.
	//<button type="button">Delete</button>

	//2. OnClick of the button call an event handler
	//<button type="button" onClick={deleteItemFromList}>Delete</button>

	//3. The event handler a) will alert user with prompt, b) call the deleteItem function from firebase

	//function deleteItemFromList {
	//if (window.confirm("Do you really want to delete this item?")) {
	//call deletItem ( parameters );
	//window.open("Your item has been deleted");
	//}else {
	//window.open("Your item has not been deleted");
	//}

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
		</li>
	);
}
