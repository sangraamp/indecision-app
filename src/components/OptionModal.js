import React from 'react'
import Modal from 'react-modal'

const OptionModal = (props) => (
	<Modal
		isOpen={!!props.selectedOption}
		/* When user hits the escape key or clicks anywhere to escape modal */
		onRequestClose={props.handleClearSelectedOption}
		contentLabel="Selected Option"
		/* Time before the modal disappears, for this amount of time we 
		will have access to the .ReactModal__overlay--before-close modifier class */
		closeTimeoutMS={200}
		/* If we use a custom className, React will ditch its
		predefined styles and use the ones we apply to the class */
		className="modal"
	>
		<h3 className="modal__title">Selected Option</h3>
		{props.selectedOption && (
			<p className="modal__body">{props.selectedOption}</p>
		)}
		<button className="button" onClick={props.handleClearSelectedOption}>
			Okay
		</button>
	</Modal>
)

export default OptionModal
