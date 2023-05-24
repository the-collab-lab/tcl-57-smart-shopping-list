import React from 'react';

const Modal = ({ closeModal }) => {
	return (
		<div className="modal">
			<h2>Modal Title</h2>
			<p>
				This is the modal content. Add any additional text, images, or links
				here.
			</p>
			<button onClick={closeModal}>Close</button>
		</div>
	);
};

export default Modal;
