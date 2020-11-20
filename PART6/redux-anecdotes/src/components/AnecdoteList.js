import React from 'react'
import { connect } from 'react-redux'
import { giveVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id, anecdote) => {
    props.giveVote(id, anecdote)
    props.showNotification(`you voted '${anecdote.content}'`, 5)
  }

  const sortAnecdotes = (anecdotes) => {
    return (
      anecdotes.sort((x, y) => y.votes - x.votes)
    )
  }

  const findAnecdote = (filter, anecdotes) => {
    const findFromAnecdote = anecdotes.filter (anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
      return findFromAnecdote

  }

  return (
    <div>
       {sortAnecdotes(findAnecdote(props.filter, props.anecdotes)).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  giveVote, showNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes