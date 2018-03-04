import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  login = async(event) => {
    event.preventDefault()
    console.log('log in with', this.state.username, this.state.password)
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user: user})
      console.log('login success')
    } catch (exception) {
      console.log('login error')
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null})
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  render() {

    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus <input type="text" name="username" value={this.state.username} onChange={this.handleLoginFieldChange} />
            </div>
            <div>
              salasana <input type="password" name="password" value={this.state.password} onChange={this.handleLoginFieldChange} />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
