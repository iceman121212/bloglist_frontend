/* eslint-disable indent */
const notificationReducer = (state = { type: null, message: null }, action) => {
  switch (action.type) {
    case 'SUCCESS':
      console.log(state)
      return { type: action.type, message: action.data.message }
    case 'ERROR':
      return { type: action.type, message: action.data.message }
    default:
      return { type: null, message: null }
  }
}

export const notificationShow = (type, message) => {
  return {
    type: type,
    data: { message: message }
  }
}

export default notificationReducer