export function AddItem() {
	return (
		<form>
			<label for="item-name-input">
				Item name:
				<input type="text" id="item-name-input" placeholder="eggs"></input>
			</label>
			<p>How soon will you buy this again?</p>
			<fieldset>
				<label>
					<input type="radio" value="soon"></input>Soon
				</label>
				<label>
					<input type="radio" value="kind-of-soon"></input>Kind of Soon
				</label>
				<label>
					<input type="radio" value="not-soon"></input>Not Soon
				</label>
			</fieldset>
		</form>
	);
}
