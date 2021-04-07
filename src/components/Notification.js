import { any } from 'prop-types'
import React from 'react'
import { Alert } from 'react-bootstrap'

const SuccessNotification = ({ message }) => {
  if (message === null) return null
  return (
    <div
      className='successNotification'
    >
      <Alert variant='success'>
        {message}
      </Alert>
    </div>
  )
}

SuccessNotification.propTypes = {
  message: any
}

const ErrorNotification = ({ message }) => {
  if (message === null) return null
  return (
    <div
      className='errorNotification'
    >
      <Alert variant='danger'>
        {message}
      </Alert>
    </div>
  )
}

ErrorNotification.propTypes = {
  message: any
}

export { SuccessNotification, ErrorNotification }
