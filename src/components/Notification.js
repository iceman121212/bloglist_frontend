import { any } from 'prop-types'
import React from 'react'

const SuccessNotification = ({ message }) => {
  if (message === null) return null
  const successNotificationStyle = {
    color: 'green',
    fontSize: 18,
    border: '1px solid'
  }
  return (
    <div
      className='successNotification'
      style={successNotificationStyle}
    >
      {message}
    </div>
  )
}

SuccessNotification.propTypes = {
  message: any
}

const ErrorNotification = ({ message }) => {
  if (message === null) return null
  const errorNotificationStyle = {
    color: 'red',
    fontSize: 18,
    border: '1px solid'
  }
  return (
    <div
      className='errorNotification'
      style={errorNotificationStyle}
    >
      {message}
    </div>
  )
}

ErrorNotification.propTypes = {
  message: any
}

export { SuccessNotification, ErrorNotification }
