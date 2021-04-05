import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginLoginChange, loginReloadChange } from '../reducers/loginReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      dispatch(loginReloadChange(loggedUserJSON))
      setusername('')
      setpassword('')
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    dispatch(loginLoginChange(username, password))
  }

  return (
    <form onSubmit={handleLogin}>
      login to application
      <div>
        username
        <input
          type='username'
          id='username'
          value={username}
          name='Username'
          onChange={({ target }) => setusername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          id='password'
          value={password}
          name='Password'
          onChange={({ target }) => setpassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )
}

export default Login
