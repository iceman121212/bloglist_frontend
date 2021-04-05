import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginLogoutChange } from '../reducers/loginReducer'

const UserDisplay = () => {
  const dispatch = useDispatch()
  const userStatus = useSelector(state => state.userStatus)
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(loginLogoutChange())
  }
  console.log(userStatus.user)
  return (
    <p id='user-display'>
      {userStatus.user} logged in.
      <button onClick={handleLogout}>log out</button>
    </p>
  )
}

export default UserDisplay
