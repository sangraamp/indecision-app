import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedOption: undefined,
	}

	handleDeleteOptions = () => {
		this.setState(() => ({ options: [] }))
	}

	handleDeleteOption = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => option !== optionToRemove),
		}))
	}

	handlePick = () => {
		const randomNum = Math.floor(Math.random() * this.state.options.length)
		const option = this.state.options[randomNum]
		this.setState(() => ({
			selectedOption: option,
		}))
	}

	handleAddOption = (option) => {
		if (!option) {
			return 'Enter a valid value to add item!'
		} else if (this.state.options.includes(option)) {
			return 'This value already exists!'
		}
		// if everything is alright, this function returns undefined

		this.setState((prevState) => ({
			// return the concatenated array without affecting the prevState object
			options: prevState.options.concat(option),
		}))
	}

	handleClearSelectedOption = () => {
		this.setState(() => ({
			selectedOption: undefined,
		}))
	}

	componentDidMount() {
		try {
			const options = JSON.parse(localStorage.getItem('options'))

			if (options) {
				this.setState(() => ({ options: options }))
			}
		} catch (e) {
			/* if JSON is invalid, do nothing */
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			localStorage.setItem('options', JSON.stringify(this.state.options))
		}
	}

	componentWillUnmount() {
		console.log('WillUnmount')
	}

	// render is not an event handler so it won't loose the 'this' binding
	render() {
		const subtitle = 'Put your life in the hands of a computer.'

		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption handleAddOption={this.handleAddOption} />
				<OptionModal
					selectedOption={this.state.selectedOption}
					handleClearSelectedOption={this.handleClearSelectedOption}
				/>
			</div>
		)
	}
}
