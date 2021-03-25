import React, { useState } from 'react'
import { BlogList } from './components/Blog'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import UserDisplay from './components/UserDisplay'
// eslint-disable-next-line no-unused-vars
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setuser] = useState(null)
  const [successMessage, setsuccessMessage] = useState(null)
  const [errorMessage, seterrorMessage] = useState(null)

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      {user === null
        ? (
          <Login
            setuser={setuser}
            seterrorMessage={seterrorMessage}
            setBlogs={setBlogs}
          />)
        : (
          <div>
            <UserDisplay
              username={user.username}
              setuser={setuser}
            />
            <Togglable buttonLabel='add blog'>
              <AddBlog
                id={user.id}
                blogs={blogs}
                setBlogs={setBlogs}
                setsuccessMessage={setsuccessMessage}
              />
            </Togglable>
            <BlogList
              blogs={blogs}
            />
          </div>)}
    </div>
  )
}

export default App
