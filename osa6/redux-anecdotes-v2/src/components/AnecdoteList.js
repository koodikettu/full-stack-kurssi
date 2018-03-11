import React from 'react'
import { connect } from 'react-redux'
import { actionForAnecdote } from '../reducers/anecdoteReducer'
import { actionForNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  voteAnecdote = (anecdote) => {
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.unsetNotification()
    }, 5000)
  }
  render() {
    const {anecdotes} = this.props

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
      anecdotes: filterAnecdotes(state.anecdotes, state.filter) 
  }
}

const filterAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter((a) => a.content.includes(filter))
}

const ConnectedAnecdoteList = connect(mapStateToProps,
  {
    setNotification: actionForNotification.setNotification,
    unsetNotification: actionForNotification.unsetNotification,
    voteAnecdote: actionForAnecdote.voteAnecdote
  }
)(AnecdoteList)

export default ConnectedAnecdoteList

