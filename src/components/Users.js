/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersGetAll } from '../reducers/usersReducer'

const User = ({ user }) => (
  <div>
    {user.username}: {user.blogs.length}
  </div>
)

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(usersGetAll())
    }
  }, [])
  const userList = useSelector(state => state.userList)
  console.log(userList)
  return (
    <ul>
      {userList.map(user => <li><User user={user} /></li>)}
    </ul>
  )
}

export default Users