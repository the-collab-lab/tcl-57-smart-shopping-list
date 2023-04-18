import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<form>
				<label htmlFor="search-filter">Item name:</label>
				<input type="text" id="search-filter" />
			</form>
			<ul>
				{data.map((item) => (
					<ListItem name={item.name} key={item.id} />
				))}
			</ul>
		</>
	);
}
