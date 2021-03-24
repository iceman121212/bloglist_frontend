import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

Blog.propTypes = {
  blog: React.propTypes.shape({
    title: String,
    author: String
  })
}

export default Blog
