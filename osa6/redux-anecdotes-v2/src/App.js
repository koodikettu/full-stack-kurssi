import React from 'react'
import ConnectedNotification from './components/Notification'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteList from './components/AnecdoteList'
import ConnectedFilter from './components/Filter'

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <ConnectedNotification />
        <ConnectedFilter />
        <ConnectedAnecdoteList />
        <ConnectedAnecdoteForm />
      </div>
    )
  }
}

export default App