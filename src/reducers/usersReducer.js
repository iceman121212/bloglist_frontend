/* eslint-disable indent */
import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GETALL':
      return action.data
    default:
      return state
  }
}

export const usersGetAll = () => {
  return async dispatch => {
    const userList = await userService.getAll()
    dispatch({
      type: 'GETALL',
      data: userList
    })
  }
}

export default usersReducer