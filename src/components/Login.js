import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loginLoginChange, loginReloadChange } from '../reducers/loginReducer'
// eslint-disable-next-line no-unused-vars
import { notificationShow } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      dispatch(loginReloadChange(loggedUserJSON))
      console.log(JSON.parse(loggedUserJSON))
      dispatch(notificationShow('SUCCESS', `${JSON.parse(loggedUserJSON).username} logged in`))
      setusername('')
      setpassword('')
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    dispatch(loginLoginChange(username, password))
    dispatch(notificationShow('SUCCESS', `${username} logged in`))
  }

  return (
    <div>
      <h4>login to application</h4>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type='text'
            id='username'
            value={username}
            name='Username'
            onChange={({ target }) => setusername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type='password'
            id='password'
            value={password}
            name='Password'
            onChange={({ target }) => setpassword(target.value)}
          />
          <Button variant='primary' id='login-button' type='submit'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login
