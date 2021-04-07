
/* eslint-disable indent */
const notificationReducer = (state = { type: null, message: null }, action) => {
  console.log(state)
  switch (action.type) {
    case 'SUCCESS':
      return { type: action.type, message: action.data.message }
    case 'ERROR':
      return { type: action.type, message: action.data.message }
    case 'DISABLE':
      return { type: null, message: null }
    default:
      return state
  }
}

export const notificationShow = (type, message) => {
  return dispatch => {
    dispatch({
      type: type,
      data: { message: message }
    })
    setTimeout(() => {
      dispatch({
        type: 'DISABLE',
      })
    }, 2000)
  }
}

export default notificationReducer