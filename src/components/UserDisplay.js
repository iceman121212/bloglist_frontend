import React from 'react'
import { Button } from 'react-bootstrap'
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
    <span id='user-display'>
      {userStatus.user} logged in.
      <Button
        variant='secondary'
        style={{ padding: 2, marginLeft: 3, marginTop: 0, marginBotton: 0 }}
        onClick={handleLogout}>
        log out
      </Button>
    </span >
  )
}

export default UserDisplay
