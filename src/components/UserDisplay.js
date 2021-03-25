import React from 'react'
import PropTypes from 'prop-types'

const UserDisplay = ({ username, setuser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setuser(null)
  }
  return (
    <p>
      {username} logged in.
      <button onClick={handleLogout}>log out</button>
    </p>
  )
}

UserDisplay.propTypes = {
  username: PropTypes.string,
  setuser: PropTypes.func
}

export default UserDisplay
