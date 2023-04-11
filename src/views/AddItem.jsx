export function AddItem() {
	return (
		<form>
			<label for="item-name-input">
				Item name:
				<input type="text" id="item-name-input" placeholder="eggs"></input>
			</label>

			<fieldset>
				<p>How soon will you buy this again?</p>
				<input type="radio" id="soon" name="time" />
				<label htmlFor="soon">Soon</label> <br />
				<input type="radio" id="kind-of-soon" name="time" />
				<label htmlFor="kind-of-soon">Kind of soon</label> <br />
				<input type="radio" id="not-soon" name="time" />
				<label htmlFor="not-soon">Not soon</label>
			</fieldset>

			<input type="submit" id="Add Item" />
		</form>
	);
}
