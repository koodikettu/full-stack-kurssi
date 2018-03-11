import React from 'react'
import { actionForAnecdote } from '../reducers/anecdoteReducer'
import { actionForNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  voteAnecdote = (anecdote) => {
    this.props.store.dispatch(actionForAnecdote.voteAnecdote(anecdote.id))
    this.props.store.dispatch(actionForNotification.setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      this.props.store.dispatch(actionForNotification.unsetNotification())
    }, 5000)
  }
  render() {
    const {anecdotes, filter} = this.props.store.getState()
    console.log(anecdotes)
    console.log(filter)
    const anecdotesToShow = anecdotes.filter((a) => a.content.includes(filter))

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                this.voteAnecdote(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
