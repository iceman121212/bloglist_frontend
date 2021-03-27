import React from 'react'
import PropTypes from 'prop-types'
import Togglable from '../components/Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
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
    setBlogs(newBlogList)
  }

  const deleteBlog = async () => {
    await blogService.deleteBlog(blog)
    const newBlogList = blogs.filter(item => item.id !== blog.id)
    setBlogs(newBlogList)
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
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
      id: PropTypes.string
    })
  ),
  setBlogs: PropTypes.func
}

const BlogList = ({ blogs, setBlogs }) => (
  blogs.map(blog => (<Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />))
)

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
      id: PropTypes.string
    })
  ),
  setBlogs: PropTypes.func
}

export { Blog, BlogList }
