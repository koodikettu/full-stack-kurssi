import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import styles from './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      author: '',
      title: '',
      url: '',
      error: null
    }
  }

  handleFieldChange = (event) => {
    if (event.target.name) {
      this.setState({ [event.target.name]: event.target.value})
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    console.log('adding blog')
    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      likes: 0,
      url: this.state.url,
    }
    try {
      const blog = await blogService.save(newBlog)
      const blogs = this.state.blogs.splice(0)
      console.log(blogs)
      blogs.push(blog)
      this.sortBlogs(blogs)
      this.setState({blogs: blogs})
      this.notify(`new blog '${blog.title}' by ${blog.author} added`)
    } catch (exception) {
      console.log('error saving blog')
      this.notify(`failed to add new blog '${newBlog.title}' by ${newBlog.author}`)
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
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('olet kirjautunut sisään')
      console.log(user)
    } catch (exception) {
      console.log('login error')
      this.notify('käyttäjätunnus tai salasana virheellinen')
    }
  }

  logout = () => {
    window.localStorage.clear()
    blogService.clearToken()
    this.setState({user: null})
    this.notify('olet kirjautunut ulos')
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  like = async (blogId) => {
    try {
      const blogList = Object.assign(this.state.blogs)
      const blog = blogList.find(b => b._id === blogId)
      blog.likes++
      await blogService.update(blog)
      this.sortBlogs(blogList)
      this.setState({blogs: blogList})
      this.notify(`new like to blog '${blog.title}' by ${blog.author} added`)
    } catch (exception) {
      console.log('error updating likes')
      this.notify(`failed to add a new like`)
    }
  }

  deleteBlog = async (blog) => {
    console.log('deleting', blog._id)
    if (window.confirm(`Delete ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.remove(blog._id)
        const blogList = this.state.blogs.filter(b => b._id !== blog._id)
        this.setState({blogs: blogList})
        this.notify(`Deleted ${blog.title} by ${blog.author}`)
      } catch (exception) {
        this.notify(`failed to delete blog`)
      }
    }

  }

  getLikeFunction = (blogId) => {
    const result = () => {
      this.like(blogId)
    }
    return result;
  }

  getDeleteFunction = (blog) => {
    const result = () => {
      this.deleteBlog(blog)
    }
    return result;
  }

  sortBlogs = blogs => {
    blogs.sort((a,b) => {
      const aLikes = a.likes ? a.likes : 0
      const bLikes = b.likes ? b.likes : 0
      return bLikes - aLikes
    })
  }

  notify = (message) => {
    this.setState({error: message})
    setTimeout(() => {
      this.setState({error: null})
    }, 2500)
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    this.sortBlogs(blogs)
    this.setState({ blogs })
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user: user})
      blogService.setToken(user.token)

    }
  } 

  render() {

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.error} />
          <h2>Log in</h2>
          <form className="loginform" onSubmit={this.login}>
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
      <div className="app-wrapper" >
        <Notification message={this.state.error} />
        <h2>blogs</h2>

        <div> 
          {this.state.user.name} logged in
          <button type="button" onClick={this.logout}>logout</button>
        </div>
        <Togglable buttonLabel="lisää blogi">
          <BlogForm title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleFieldChange={this.handleFieldChange}
            submitFunction={this.addBlog}
            />
        </Togglable>


        {this.state.blogs.map(blog => {
          return (
            <Blog key={blog._id} blog={blog} likeFunction={this.getLikeFunction(blog._id)} deleteFunction={this.getDeleteFunction(blog)} loggedInUsername={this.state.user.username}/>
          )
        }
        )}
      </div>
    );
  }
}

export default App;
