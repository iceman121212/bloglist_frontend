import React from 'react'
import { BlogList, BlogView } from './components/Blog'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import UserDisplay from './components/UserDisplay'
// eslint-disable-next-line no-unused-vars
import Togglable from './components/Togglable'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from 'react-router-dom'
import Users, { UserBlogs } from './components/Users'

const App = () => {
  const messageType = useSelector(state => state.notification.type)
  const message = useSelector(state => state.notification.message)
  const userStatus = useSelector(state => state.userStatus)

  const padding = { padding: 5 }

  return (
    <Router>
      <div>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <Switch>
        <Route path='/blogs/:id'>
          <BlogView />
        </Route>
        <Route path='/blogs'>
          <div>
            <h2>blogs</h2>
            {messageType === 'SUCCESS'
              ? (<SuccessNotification message={message} />)
              : (<ErrorNotification message={message} />)
            }
            {userStatus.user === null
              ? (<Login />)
              : (
                <div>
                  <UserDisplay
                    username={userStatus.username}
                  />
                  <Togglable buttonLabel='add blog'>
                    <AddBlog
                      id={userStatus.id}
                    />
                  </Togglable>
                </div>)}
            <BlogList />
          </div>
        </Route>
        <Route path='/users/:id'>
          <UserBlogs />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Redirect to='/blogs' />
        </Route>
      </Switch>

    </Router>
  )
}

export default App
