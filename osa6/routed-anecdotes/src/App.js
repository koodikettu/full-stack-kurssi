import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Badge, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

const Menu = () => {
  const menuStyle = {
    backgroundColor: 'lightgray',
    padding: '15px 15px'
  }
  const linkStyle = {
    margin: '0 2px',
    padding: '15px 15px',
    color: 'black'

  }
  const activeLinkStyle = {
    margin: '0 2px',
    padding: '15px 15px',
    color: 'white',
    backgroundColor: 'gray'
  }
  return (
    <div style={menuStyle}>    
      <NavLink style={linkStyle} exact activeStyle={activeLinkStyle} to="/">anecdotes</NavLink>&nbsp;
      <NavLink style={linkStyle} activeStyle={activeLinkStyle} to="/create-new">create new</NavLink>&nbsp;
      <NavLink style={linkStyle} activeStyle={activeLinkStyle} to="/about">about</NavLink>&nbsp;
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} >
        
        <Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link>
      </ListGroupItem>)}
    </ListGroup>  
  </div>
)

const Notification = ({ message }) => {
  const notificationStyle = {
    padding: '12px 8px 4px 8px',
    color: 'green',
    background: 'lightgreen',
    border: '2px solid green',
    borderRadius: '4px'
  }
  if (message) {
    return (
      <div style={notificationStyle}>
        <p>
          {message}
        </p>
      </div>)
  }
  return ''


}

const Anecdote = ({anecdote}) => 
  (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>
        has <Badge>{ anecdote.votes }</Badge> votes
      </div>
      <div>
        for more info see <a href={anecdote.info} target="_blank">{anecdote.info}</a>
      </div>
    </div>

  )

const About = () => (
  <div className="row">
    <div className="col-md-9"> 
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>
      
      <em>An anecdote is a brief, revealing account of an individual person or an incident. 
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
    <div className="col-md-3">
      <img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg" />
    </div>
  </div>
)

const Footer = () =>  {
  const footerStyle = {
    backgroundColor: 'lightgray',
    padding: '15px 15px'
  }
  return (
  <div style={footerStyle}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    const notification = `New anecdote ${this.state.content} created!`
    this.props.onCreateNew(notification)
    this.props.history.push('/', {notification: notification})
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>
              content
            </ControlLabel>
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              author
            </ControlLabel>
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              url for more info
            </ControlLabel>
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Button type="submit" bsStyle="primary">create</Button>
            
          </FormGroup>

        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  showNotification = (message) => {
    this.setState({notification: message})
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Notification message={this.state.notification} />
          <Router>
            <div>
              <div>
                <Menu />

              </div>
              <Route exact path= "/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route exact path= "/about" render={() => <About /> } />
              <Route exact path= "/create-new" render={({history}) => <CreateNew history = {history} addNew={this.addNew} onCreateNew={this.showNotification}/>} />
              <Route path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            </div>


          </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
