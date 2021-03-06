class VisibilityToggle extends React.Component {
	constructor(props) {
		super(props)
		this.handleToggleVisibility = this.handleToggleVisibility.bind(this)
		this.state = {
			visibility: false,
		}
	}
	handleToggleVisibility() {
		this.setState((prevState) => {
			return {
				visibility: !prevState.visibility,
			}
		})
	}
	render() {
		return (
			<div>
				<h1>{this.state.visibility ? 'These are the details!' : ''}</h1>
				<button onClick={this.handleToggleVisibility}>
					{this.state.visibility ? 'Hide details' : 'Show details'}
				</button>
			</div>
		)
	}
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'))

// let show = false

// const toggle = () => {
// 	show = !show
// 	render()
// }

// const appRoot = document.getElementById('app')

// const render = () => {
// 	const template = (
// 		<div>
// 			<button onClick={toggle}>{show ? 'Hide details' : 'Show details'}</button>
// 			<p>{show ? 'Here are the details!' : ''}</p>
// 		</div>
// 	)

// 	ReactDOM.render(template, appRoot)
// }

// render()
