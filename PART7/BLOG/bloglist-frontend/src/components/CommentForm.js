import React, { useState } from 'react'
import { Button,  Form } from 'react-bootstrap'

const CommentForm = (props) => {
  const [comment, setComment] = useState('')
  return (
    <Form>
      <Form.Group>
        <Form.Control
          type='text'
          id='comment'
          value={ comment }
          onChange={({ target }) => setComment(target.value)}
        />
        <Button  variant="success" type="submit" onClick={e => { e.preventDefault(); props.postComment(comment) }}>Add comment</Button>
      </Form.Group>
    </Form>
  )
}

export default CommentForm