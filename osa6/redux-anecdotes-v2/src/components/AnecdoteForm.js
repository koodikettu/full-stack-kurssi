import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { notifyWith } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const anecdoteObject = {
      content,
      votes: 0
    }
    e.target.anecdote.value = ''
    this.props.createNew(anecdoteObject)
    this.props.notifyWith(`New anecdote: '${anecdoteObject.content}'`, 5)
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}


const ConnectedAnecdoteForm = connect(null,
  {
    createNew: createNew,
    notifyWith: notifyWith
  }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
