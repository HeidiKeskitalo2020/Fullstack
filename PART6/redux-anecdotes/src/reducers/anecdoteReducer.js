import anecdoteServices from '../services/anecdotes'


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_VOTE': {
      const id = action.data.id
      const voteToChange = state.find(v => v.id === id)
      const changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
      return state.map(v =>
        v.id !== id ? v : changedVote )
    }
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTES': {
      return [...state, action.data]
    }
    default:
      return state
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTES',
      data: newAnecdote,
    })
  }
}
export const giveVote = (id, anecdote) => {
  return async dispatch => {
    anecdote.votes++
    const newAnecdote = await anecdoteServices.update(id, anecdote)
    dispatch({
      type: 'NEW_VOTE', 
      data: newAnecdote
    })
  }
}

export default reducer
