import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import store from './store'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </ Provider>,
    document.getElementById('root')
  )
}

store.dispatch(initializeAnecdotes())
render()
store.subscribe(render)

