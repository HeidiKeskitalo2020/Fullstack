const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      let stateClone = { ...state }
      stateClone = action.notification
      return stateClone
    
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



export default notificationReducer