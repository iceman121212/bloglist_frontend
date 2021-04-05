import React from 'react'
import { BlogList } from './components/Blog'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import UserDisplay from './components/UserDisplay'
// eslint-disable-next-line no-unused-vars
import Togglable from './components/Togglable'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const messageType = useSelector(state => state.notification.type)
  const message = useSelector(state => state.notification.message)
  const userStatus = useSelector(state => state.userStatus)

  const padding = { padding: 5 }

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <Switch>
        <Route path='/blogs'>
          <div>
            <h2>Blogs WIP</h2>
          </div>
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
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
                  <BlogList />
                </div>)}
          </div>
        </Route>
      </Switch>

    </Router>
  )
}

export default App
