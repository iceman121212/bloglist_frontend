/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersGetAll } from '../reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from 'react-router-dom'

export const UserBlogs = () => {
  const id = useParams().id
  const userList = useSelector(state => state.userList)
  const user = userList.find(u => u.id === id)
  if (!user) return null
  console.log(id)
  return (
    <div>
      <h2>{user.username}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => <li>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const User = ({ user }) => (
  <div>
    <Link to={`/users/${user.id}`}>{user.username}</Link>: {user.blogs.length}
  </div>
)

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(usersGetAll())
  }, [])
  const userList = useSelector(state => state.userList)
  console.log(userList)
  return (
    <ul>
      {userList.map(user =>
        <li>
          <User user={user} />
        </li>
      )}
    </ul>
  )
}

export default Users