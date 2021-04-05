import React from 'react'
import PropTypes from 'prop-types'
import Togglable from '../components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { bloglistAddLike, bloglistDelete } from '../reducers/bloglistReducer'

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

  const addLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(bloglistAddLike(updatedBlog))
  }

  const deleteBlog = async () => {
    dispatch(bloglistDelete(blog))
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable id='view-blog' buttonLabel='view'>
        <p style={itemStyle}>{blog.url}</p>
        <p style={itemStyle}>
          <span className='likes'>{blog.likes}</span>
          <button onClick={addLike}>like</button>
        </p>
        <p style={itemStyle}>{blog.user.name}</p>
        <button onClick={deleteBlog}>remove</button>
      </Togglable>
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
