import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const AddBlog = ({ id, blogs, setBlogs, setsuccessMessage }) => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    try {
      const savedBlog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(savedBlog))
      settitle('')
      setauthor('')
      seturl('')

      setsuccessMessage(`blog '${savedBlog.title}' by author '${savedBlog.author}' saved successfully`)
      setTimeout(() => {
        setsuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <form onSubmit={handleNewBlog}>
      <p>add blog</p>
      <div>
        title
        <input
          type='text'
          value={title}
          name='Title'
          id='blog-title'
          onChange={({ target }) => settitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name='Author'
          id='blog-author'
          onChange={({ target }) => setauthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name='URL'
          id='blog-url'
          onChange={({ target }) => seturl(target.value)}
        />
      </div>
      <button id='submit-blog' type='submit'>add</button>
    </form>
  )
}

AddBlog.propTypes = {
  id: PropTypes.string,
  blogs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.any
  })),
  setBlogs: PropTypes.func,
  setsuccessMessage: PropTypes.func
}

export default AddBlog
