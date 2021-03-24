import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

Blog.propTypes = {
  blog: PropTypes.shape({
    title: String,
    author: String
  })
}

const BlogList = ({ blogs }) => (
  blogs.map(blog => (<Blog key={blog.id} blog={blog} />))
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
  )
}

export { Blog, BlogList }
