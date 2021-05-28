import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageLoader = ({message }) => (
  <Message positive info negative warning>
    {message}
  </Message>
)

export default MessageLoader
