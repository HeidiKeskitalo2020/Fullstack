/*
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/


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
    case 'NEW_ANECDOTE': {
      //const content = action.data.content
      return [...state, action.data]
    }
    default:
      return state
  }
}
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}
export const createAnecdote = (content) => {
  return { type: 'NEW_ANECDOTE', data: content }
}
export const giveVote = (id) => {
  return { type: 'NEW_VOTE', data: { id }}
}

export default reducer
