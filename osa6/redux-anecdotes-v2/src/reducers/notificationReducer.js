
  
const initialState = null

const notificationReducer = (store = initialState, action) => {
    if (action.type === 'SET_NOTIFICATION') {
        return action.content
    }
    if (action.type === 'UNSET_NOTIFICATION') {
        return null
    }
    return store
}

export const actionForNotification = {
    setNotification(content) {   
      return { 
        type: 'SET_NOTIFICATION', 
        content 
      }
    },
    unsetNotification() {
      return {
        type: 'UNSET_NOTIFICATION'
      }
    }
  }

export default notificationReducer