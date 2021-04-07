/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { bloglistAddLike, bloglistDelete, bloglistInitialize, bloglistUpdate } from '../reducers/bloglistReducer'
import {
  BrowserRouter as Router, Link, useParams
} from 'react-router-dom'
import Comments from './Comments'
import { Table } from 'react-bootstrap'

export const BlogView = () => {
  const dispatch = useDispatch()

  const blogList = useSelector(state => state.bloglist)
  console.log(blogList)
  const blog = blogList.find(b => b.id === useParams().id)

  const addLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(bloglistAddLike(updatedBlog))
  }

  if (!blog) return null
  return (
    <div>
      <h1>{blog.title}</h1>
      <ul>
        <li>{blog.url}</li>
        <li>
          {blog.likes} likes
          <button onClick={addLike}>like</button>
        </li>
        <li>added by {blog.user.username}</li>
      </ul>
      <Comments blog={blog} />
    </div>
  )
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const itemStyle = {
    margin: 0,
    padding: 0
  }

  const deleteBlog = async () => {
    dispatch(bloglistDelete(blog))
  }

  return (
    // <div style={blogStyle}>
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string
    }
    ),
    id: PropTypes.string
  }),
}

const BlogList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(bloglistInitialize())
  }, [])
  const blogs = useSelector(state => state.bloglist)
  return (
    <Table striped>
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <td>
              <Blog key={blog.id} blog={blog} blogs={blogs} />
            </td>
            <td>
              {blog.author}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export { Blog, BlogList }
