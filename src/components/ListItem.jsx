import './ListItem.css';

export function ListItem({ name, itemId }) {
	return (
		<li className="ListItem">
			<input type="checkbox" id={itemId} />
			<label htmlFor={itemId}>{name}</label>
		</li>
	);
}
