import React from 'react'

export default class AddOption extends React.Component {
	// babel plugin class-properties at work
	state = {
		error: undefined,
	}
	/*  we will override the constructor and add some the 'this' binding to all event handlers so that we won't have to worry about it later.
		constructor(props) {
			super(props)
			this.handleAddOption = this.handleAddOption.bind(this)
			this.state = {
				error: undefined
			}
		} 
	*/
	// babel plugin class-properties at work (no need to bind 'this', happens behind the scenes)
	handleAddOption = (e) => {
		e.preventDefault()

		const option = e.target.elements.option.value.trim()
		const error = this.props.handleAddOption(option)

		this.setState(() => ({ error }))

		if (!error) {
			e.target.elements.option.value = '' // clear the previous input
		}
	}
	render() {
		return (
			<div>
				{this.state.error && (
					<p className="add-option-error">{this.state.error}</p>
				)}
				<form className="add-option" onSubmit={this.handleAddOption}>
					<input
						className="add-option__input"
						type="text"
						name="option"
					></input>
					<button className="button">Add Option</button>
				</form>
			</div>
		)
	}
}
