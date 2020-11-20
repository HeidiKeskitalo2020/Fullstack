const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return initialState
    
    default:
      return state
  }
}
export const showNotification = (notification, duration)  => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification,
  })
  setTimeout(() => {
    dispatch({
      type: 'HIDE_NOTIFICATION'
    })
  }, duration * 1000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}


export default notificationReducer