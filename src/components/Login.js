import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setuser, seterrorMessage, setBlogs }) => {
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
      const blogsUser = await blogService.getAll()
      const sortedBlogList = blogsUser.sort((first, next) => {
        return next.likes - first.likes
      })
      setBlogs(sortedBlogList)
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
      const blogsUser = await blogService.getAll()
      setBlogs(blogsUser)
    } catch (exception) {
      seterrorMessage('wrong username or password')
      setTimeout(() => {
        seterrorMessage(null)
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
          value={username}
          name='Username'
          onChange={({ target }) => setusername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setpassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

Login.propTypes = {
  setuser: Function,
  seterrorMessage: Function,
  setBlogs: Function
}

export default Login
