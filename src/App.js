import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { SuccessNotification, ErrorNotification } from './components/Notification'

const Login = ({ username, password, user }) => {

}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [user, setuser] = useState(null)
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')
  const [successMessage, setsuccessMessage] = useState(null)
  const [errorMessage, seterrorMessage] = useState(null)

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

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: user.id
    }
    console.log(newBlog)

    try {
      const savedBlog = await blogService.addBlog(newBlog)
      console.log(savedBlog)
      setBlogs(blogs.concat(savedBlog))
      settitle('')
      setauthor('')
      seturl('')

      setsuccessMessage(`blog '${savedBlog.title}' by author '${savedBlog.author}' saved successfully`)
      setTimeout(() => {
        setsuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  const addBlogForm = () => (
    <form onSubmit={handleNewBlog}>
      login to application
      <div>
        title
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => settitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setauthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => seturl(target.value)}
        />
      </div>
      <button type='submit'>add</button>
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
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      {user === null && loginForm()}
      {user !== null && userDisplay()}
      {user !== null && addBlogForm()}
      {user !== null && blogDisplay()}
    </div>
  )
}

export default App
