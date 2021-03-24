import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [user, setuser] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setBlogs(blogsUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

    blogService.setToken(user.token)
    setuser(user)
    setusername('')
    setpassword('')
    const blogsUser = await blogService.getAll()
    setBlogs(blogsUser)
  }

  const loginForm = () => (
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

  const blogDisplay = () => {
    const blogToDisplay = blogs.map(blog => (<Blog key={blog.id} blog={blog} />))
    return blogToDisplay
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setuser(null)
  }

  const userDisplay = () => (
    <p>
      {user.username} logged in.
      <button onClick={handleLogout}>log out</button>
    </p>
  )

  return (
    <div>
      <h2>blogs</h2>
      {user === null && loginForm()}
      {user !== null && userDisplay()}
      {user !== null && blogDisplay()}
    </div>
  )
}

export default App