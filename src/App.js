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
import { Nav, Navbar } from 'react-bootstrap'

const Navigation = ({ user }) => {
  const padding = { padding: 5 }
  const fontColor = { color: 'white' }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav justify className="mr-auto">
          <Nav.Link href="#" as="span" className='align-middle'>
            <Link style={padding, fontColor} to="/blogs">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding, fontColor} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user
              ? <em><UserDisplay /></em>
              : ''
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const App = () => {
  const messageType = useSelector(state => state.notification.type)
  const message = useSelector(state => state.notification.message)
  const userStatus = useSelector(state => state.userStatus)

  return (
    <div className='container'>
      <Router>
        <Navigation user={userStatus.user} />
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
    </div>
  )
}

export default App
