import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notifyWith } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  voteAnecdote = async (anecdote) => {
    this.props.vote(anecdote)
    this.props.notifyWith(`you voted '${anecdote.content}'`, 5)
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
    notifyWith: notifyWith,
    vote: vote
  }
)(AnecdoteList)

export default ConnectedAnecdoteList

