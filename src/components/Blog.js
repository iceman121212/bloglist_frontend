/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import Togglable from '../components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { bloglistAddLike, bloglistDelete } from '../reducers/bloglistReducer'
import {
  BrowserRouter as Router, Link, useParams
} from 'react-router-dom'

export const BlogView = () => {
  const dispatch = useDispatch()
  const addLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(bloglistAddLike(updatedBlog))
  }

  const blogList = useSelector(state => state.bloglist)
  console.log(blogList)
  const blog = blogList.find(b => b.id === useParams().id)
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

  console.log('BLOG COMPONENT RENDERED')
  console.log(blog)

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      {/* <Togglable id='view-blog' buttonLabel='view'>
        <p style={itemStyle}>{blog.url}</p>
        <p style={itemStyle}>
          <span className='likes'>{blog.likes}</span>
          <button onClick={addLike}>like</button>
        </p>
        <p style={itemStyle}>{blog.user.name}</p>
        <button onClick={deleteBlog}>remove</button>
      </Togglable> */}
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
  const blogs = useSelector(state => state.bloglist)
  return (
    blogs.map(blog => (<Blog key={blog.id} blog={blog} blogs={blogs} />))
  )
}

export { Blog, BlogList }
