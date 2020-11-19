const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      let stateClone = { ...state}
      stateClone = action.content
      return stateClone
    default:
      return state
  }
}

export const filterAnecdotes = (content) => {
  return {
    type: 'SET_FILTER',
    content,
  }
}

export default filterReducer 
