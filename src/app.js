import React from 'react'
import ReactDOM from 'react-dom'
import IndecisionApp from './components/IndecisionApp'
/* to reset the starting points for different browsers */
import 'normalize.css/normalize.css'
import './styles/styles.scss'

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))
