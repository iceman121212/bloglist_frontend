import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { notificationShow } from '../reducers/notificationReducer'
import { bloglistInitialize } from '../reducers/bloglistReducer'

const Login = ({ setuser }) => {
  const dispatch = useDispatch()
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setuser(user)
      blogService.setToken(user.token)
      setuser(user)
      setusername('')
      setpassword('')
      dispatch(bloglistInitialize())
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setuser(user)
      setusername('')
      setpassword('')
      dispatch(bloglistInitialize())
    } catch (exception) {
      dispatch(notificationShow('ERROR', 'wrong username or password'))
      setTimeout(() => {
        dispatch(notificationShow(null))
      }, 5000)
    }
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

Login.propTypes = {
  setuser: PropTypes.func,
  setBlogs: PropTypes.func
}

export default Login
