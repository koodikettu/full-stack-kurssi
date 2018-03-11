import anecdoteService from '../services/anecdotes'

const getId = () => (100000*Math.random()).toFixed(0)

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes} ]
  }
  if (action.type === 'CREATE') {
    return [...store, { content: action.anecdote.content, id: action.anecdote.id, votes: action.anecdote.votes }]
  }

  return store
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.forEach((a) => {
        dispatch({
          type: 'CREATE',
          anecdote: a
        })
    })
  }
}

export const createNew = (object) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(object)
    dispatch({
      type: 'CREATE',
      anecdote: newAnecdote
    })
  }
}

export const vote = (object) => {
  return async (dispatch) => {
    object.votes++
    const updatedObject = await anecdoteService.update(object)
    dispatch({
      type: 'VOTE',
      id: updatedObject.id
    })
  }
}

export default anecdoteReducer