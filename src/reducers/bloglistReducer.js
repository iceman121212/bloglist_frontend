import blogService from '../services/blogs'

/* eslint-disable indent */
const bloglistReducer = (state = [], action) => {
  console.log(state)
  switch (action.type) {
    case 'ADDLIKE':
      // eslint-disable-next-line no-case-declarations
      const newBlogList = state.map((b) => b.id === action.data.id ? { ...b, likes: b.likes + 1 } : b)
      return newBlogList
    case 'INITIALIZE':
      return action.data.bloglist
    case 'CREATE':
      return [...state, action.data.blog]
    case 'DELETE':
      return state.filter((b) => b.id !== action.data.id)
    case 'UPDATE':
      return state.map((b) => b.id === action.data.id ? { ...b, comments: action.data.comments } : b)
    default:
      return state
  }
}

// export const bloglistInitialize = (bloglist) => {
//   return {
//     type: 'INITIALIZE',
//     data: { bloglist: bloglist }
//   }
// }

export const bloglistInitialize = () => {
  return async dispatch => {
    const bloglist = await blogService.getAll()
    const sortedBlogList = bloglist.sort((first, next) => {
      return next.likes - first.likes
    })
    dispatch({
      type: 'INITIALIZE',
      data: { bloglist: sortedBlogList }
    })
  }
}

// export const bloglistAddLike = (id) => {
//   return {
//     type: 'ADDLIKE',
//     data: { id: id }
//   }
// }

export const bloglistAddLike = (updatedBlog) => {
  return async dispatch => {
    await blogService.updateBlog(updatedBlog)
    dispatch({
      type: 'ADDLIKE',
      data: { id: updatedBlog.id }
    })
  }
}

export const bloglistAdd = (newBlog) => {
  return async dispatch => {
    const savedBlog = await blogService.addBlog(newBlog)
    dispatch({
      type: 'CREATE',
      data: { blog: savedBlog }
    })
  }
}

// eslint-disable-next-line no-unused-vars
// export const bloglistDelete = (id) => {
//   return {
//     type: 'DELETE',
//     data: { id: id }
//   }
// }

export const bloglistDelete = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE',
      data: { id: blog.id }
    })
  }
}

export const bloglistUpdate = (blog) => {
  return async dispatch => {
    await blogService.updateBlog(blog)
    dispatch({
      type: 'UPDATE',
      data: blog
    })
  }
}

export default bloglistReducer