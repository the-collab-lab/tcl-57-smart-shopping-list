/* eslint-disable jsx-a11y/label-has-associated-control */
export function AddItem() {
	return (
		<form>
			<label for="item-name-input">
				Item name:
				<input type="text" id="item-name-input" placeholder="eggs"></input>
			</label>
			<p>How soon will you buy this again?</p>
			<label>
				<input type="radio"></input>Soon
			</label>
		</form>
	);
}
