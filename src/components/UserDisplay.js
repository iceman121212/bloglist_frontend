import React from 'react'

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
  username: String,
  setuser: Function
}

export default UserDisplay
