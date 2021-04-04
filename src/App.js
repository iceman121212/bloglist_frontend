import React, { useState } from 'react'
import { BlogList } from './components/Blog'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import UserDisplay from './components/UserDisplay'
// eslint-disable-next-line no-unused-vars
import Togglable from './components/Togglable'
import { useSelector } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setuser] = useState(null)
  const messageType = useSelector(state => state.notification.type)
  const message = useSelector(state => state.notification.message)
  console.log(message)

  return (
    <div>
      <h2>blogs</h2>
      {messageType === 'SUCCESS'
        ? (<SuccessNotification message={message} />)
        : (<ErrorNotification message={message} />)
      }
      {user === null
        ? (
          <Login
            setuser={setuser}
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
              />
            </Togglable>
            <BlogList
              blogs={blogs}
              setBlogs={setBlogs}
            />
          </div>)}
    </div>
  )
}

export default App
