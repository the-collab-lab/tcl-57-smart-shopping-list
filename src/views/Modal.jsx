import React from 'react';

const Modal = ({ closeModal }) => {
	return (
		<div>
			<h2>Welcome to your Shopping List</h2>
			<p>
				Here is where you can create a shopping list, visit a saved shopping
				list!
			</p>
			<button onClick={closeModal}>Close</button>
		</div>
	);
};

export default Modal;
