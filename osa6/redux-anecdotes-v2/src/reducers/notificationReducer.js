
  
const initialState = null

const notificationReducer = (store = initialState, action) => {
    if (action.type === 'SET_NOTIFICATION') {
      console.log('reducing')
      console.log(action.content)
        return action.content
    }
    if (action.type === 'UNSET_NOTIFICATION') {
        return null
    }
    return store
}


export const notifyWith = (message, seconds) => {
  return async(dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content: message
    })
    setTimeout(() => {
      dispatch({
        type: 'UNSET_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

export default notificationReducer