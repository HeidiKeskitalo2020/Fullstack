const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
    case 'NEW_ANECDOTE': {
      const content = action.data.content
      return [...state, asObject(content)]
    }
    default:
      return state
  }
}

export default reducer