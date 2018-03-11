import React from 'react'
import { connect } from 'react-redux'
import {actionForAnecdote} from '../reducers/anecdoteReducer'
import {actionForNotification} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createAnecdote(content)
    this.props.setNotification(`New anecdote: '${content}'`)
    e.target.anecdote.value = ''
    setTimeout(() => {
      this.props.unsetNotification()
    }, 5000)
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
    setNotification: actionForNotification.setNotification,
    unsetNotification: actionForNotification.unsetNotification,
    createAnecdote: actionForAnecdote.createAnecdote
  }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
