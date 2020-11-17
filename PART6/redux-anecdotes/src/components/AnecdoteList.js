import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { giveVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(giveVote(id))
  }

  const sortAnecdotes = (anecdotes) => {
    return (
      anecdotes.sort((x, y) => y.votes - x.votes)
    )
  }
  return (
    <div>
       {sortAnecdotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList