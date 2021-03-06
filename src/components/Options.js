import React from 'react'
import Option from './Option'

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

export default Options
