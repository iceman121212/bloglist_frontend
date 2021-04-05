import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { notificationShow } from '../reducers/notificationReducer'
import { bloglistAdd } from '../reducers/bloglistReducer'
import { useDispatch } from 'react-redux'

// eslint-disable-next-line no-unused-vars
const AddBlog = ({ id }) => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')
  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    try {
      dispatch(bloglistAdd(newBlog))

      settitle('')
      setauthor('')
      seturl('')

      dispatch(notificationShow('SUCCESS', `blog '${newBlog.title}' by author '${newBlog.author}' saved successfully`))
      setTimeout(() => {
        dispatch(notificationShow(null))
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
}

export default AddBlog
