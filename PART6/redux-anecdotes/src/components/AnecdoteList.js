import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { giveVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, anecdote) => {
    dispatch(giveVote(id, anecdote))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
  }

  const sortAnecdotes = (anecdotes) => {
    return (
      anecdotes.sort((x, y) => y.votes - x.votes)
    )
  }

  const findAnecdote = () => {
    let anecdoteCopy = [...anecdotes]
    let filterCopy = filter
    let filteredAnecdotes = anecdoteCopy.filter(a => a.content.toUpperCase()
    .includes(filterCopy.toUpperCase()))

    return filteredAnecdotes

  }

  return (
    <div>
       {sortAnecdotes(findAnecdote()).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList