import React, { useState } from 'react'


const CommentForm = (props) => {
  const [comment, setComment] = useState('')
  return (
    <form>
      <input
        type='text'
        id='comment'
        value={ comment }
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={e => { e.preventDefault(); props.postComment(comment) }}>Add comment</button>

    </form>
  )
}

export default CommentForm