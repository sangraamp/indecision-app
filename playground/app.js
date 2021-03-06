class IndecisionApp extends React.Component {
	// we will override the constructor and add some the 'this' binding to all event handlers so that we won't have to worry about it later.
	constructor(props) {
		super(props)
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
		this.handlePick = this.handlePick.bind(this)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.handleDeleteOption = this.handleDeleteOption.bind(this)
		this.state = {
			options: [],
		}
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
	// an event handler looses the 'this' binding, which we fix in the constructor call
	handleDeleteOptions() {
		this.setState(() => ({ options: [] }))
	}
	handleDeleteOption(optionToRemove) {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => option !== optionToRemove),
		}))
	}
	handlePick() {
		const randomNum = Math.floor(Math.random() * this.state.options.length)
		const option = this.state.options[randomNum]
		alert(option)
	}
	handleAddOption(option) {
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
			</div>
		)
	}
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			<h2>{props.subtitle}</h2>
		</div>
	)
}

Header.defaultProps = {
	title: 'Indecision',
}

const Action = (props) => {
	return (
		<div>
			<button onClick={props.handlePick} disabled={!props.hasOptions}>
				What should I do?
			</button>
		</div>
	)
}

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleDeleteOptions}>Remove All</button>
			{props.options.length === 0 && (
				<p>Please add an option to get started!</p>
			)}
			{props.options.map((option) => (
				<Option
					key={option}
					optionText={option}
					handleDeleteOption={props.handleDeleteOption}
				/>
			))}
			{/* key won't be available in Option class so we're sending individual options via the optionText prop. */}
		</div>
	)
}

const Option = (props) => {
	return (
		<div>
			{props.optionText}
			<button
				onClick={(e) => {
					props.handleDeleteOption(props.optionText)
				}}
			>
				remove
			</button>
		</div>
	)
}

class AddOption extends React.Component {
	constructor(props) {
		super(props)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.state = {
			error: undefined,
		}
	}
	handleAddOption(e) {
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
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option"></input>
					<button>Add Option</button>
				</form>
			</div>
		)
	}
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))
