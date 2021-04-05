import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationShow } from './notificationReducer'
import { bloglistInitialize } from './bloglistReducer'


// state = user
/* eslint-disable indent */
const loginReducer = (state = { name: null, userToken: null, user: null, id: null }, action) => {
  console.log(state)
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return { name: null, userToken: null, user: null, id: null }
    case 'RELOAD':
      return action.data
    default:
      return state
  }
}

export const loginLoginChange = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: {
          name: user.name,
          userToken: user.token,
          user: user.username,
          id: user.id,
        }
      })
      dispatch(bloglistInitialize())
    } catch (exception) {
      dispatch(notificationShow('ERROR', 'wrong username or password'))
      setTimeout(() => {
        dispatch(notificationShow(null))
      }, 5000)
    }
  }
}

export const loginLogoutChange = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const loginReloadChange = (loggedUserJSON) => {
  return async dispatch => {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch({
      type: 'RELOAD',
      data: {
        name: user.name,
        userToken: user.token,
        user: user.username,
        id: user.id
      }
    })
    dispatch(bloglistInitialize())
  }
}



export default loginReducer