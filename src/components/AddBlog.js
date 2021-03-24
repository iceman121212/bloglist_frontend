import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

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
          onChange={({ target }) => settitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setauthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => seturl(target.value)}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  )
}

AddBlog.propTypes = {
  id: String,
  blogs: PropTypes.arrayOf(PropTypes.shape({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: String
  })),
  setBlogs: Function,
  setsuccessMessage: Function
}

export default AddBlog
