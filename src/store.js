// import { createStore, applyMiddleware } from 'redux'
import { combineReducers, createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer'
// import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(reducer)

export default store