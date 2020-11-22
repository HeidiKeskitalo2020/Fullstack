const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return action.data
  case 'NULLIFY':
    return initialState
  default:
    return state
  }
}

export const userAdd = (user) => {
  return {
    type: 'ADD_USER',
    data: user
  }
}

export const userNullify = () => {
  return {
    type: 'NULLIFY'
  }
}

export default userReducer