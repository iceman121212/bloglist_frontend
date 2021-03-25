import React from 'react'
import PropTypes from 'prop-types'
import Togglable from '../components/Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
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
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id
    }

    await blogService.updateBlog(updatedBlog)
    const newBlogList = await blogService.getAll()
    const sortedBlogList = newBlogList.sort((first, next) => {
      return next.likes - first.likes
    })
    setBlogs(sortedBlogList)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel='view'>
        <p style={itemStyle}>{blog.url}</p>
        <p style={itemStyle}>
          {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p style={itemStyle}>{blog.user.name}</p>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: PropTypes.shape({
      username: String,
      name: String,
      id: String
    }
    ),
    id: String
  }),
  setBlogs: Function
}

const BlogList = ({ blogs, setBlogs }) => (
  blogs.map(blog => (<Blog key={blog.id} blog={blog} setBlogs={setBlogs} />))
)

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: String,
      author: String,
      url: String,
      likes: Number,
      id: String
    })
  ),
  setBlogs: Function
}

export { Blog, BlogList }
