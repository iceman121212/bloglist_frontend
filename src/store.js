// import { createStore, applyMiddleware } from 'redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import bloglistReducer from './reducers/bloglistReducer'
import loginReducer from './reducers/loginReducer'
// import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notification: notificationReducer,
  bloglist: bloglistReducer,
  userStatus: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store