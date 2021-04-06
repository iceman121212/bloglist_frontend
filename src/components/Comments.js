import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bloglistUpdate } from '../reducers/bloglistReducer'


const Comments = ({ blog }) => {
  const [comment, setcomment] = useState('')
  const dispatch = useDispatch()

  const handleComment = async (event) => {
    console.log(blog)
    event.preventDefault()
    const content = comment
    const newComments = blog.comments ? blog.comments.concat(content) : [content]
    const updatedBlog = { ...blog, comments: newComments }
    console.log(updatedBlog)
    dispatch(bloglistUpdate(updatedBlog))
  }

  return (
    <div>
      <form onSubmit={handleComment}>
        <h3>add comment</h3>
        <div>
          new comment
          <input
            type='text'
            value={comment}
            name='Title'
            id='blog-title'
            onChange={({ target }) => setcomment(target.value)}
          />
        </div>
        <button id='submit-comment' type='submit'>add</button>
      </form>
      <ul>
        {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}

export default Comments