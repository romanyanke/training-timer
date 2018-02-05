import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import setup from '../src/Setup/Setup.actions'

const reducer = combineReducers({
  setup,
})

export default createStore(reducer, composeWithDevTools())
