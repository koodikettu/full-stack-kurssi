const initialState = ''

const filterReducer = (store = initialState, action) => {
    if (action.type === 'SET_FILTER') {
        return action.content
    }
    return store
}

export const actionForFilter = {
    setFilter(content) {   
      return { 
        type: 'SET_FILTER', 
        content 
      }
    }
  }

export default filterReducer