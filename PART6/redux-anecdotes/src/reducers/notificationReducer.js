const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      let stateClone = { ...state }
      stateClone = action.notification
      return stateClone
    case 'HIDE_NOTIFICATION':
      return initialState
    
    default:
      return state
  }
}
export const showNotification = notification  => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}
export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}


export default notificationReducer