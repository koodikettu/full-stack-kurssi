import React from 'react'

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggle = () => {
      var newState = this.state.isOpen ? false : true
      this.setState({isOpen: newState})
    }
  }



  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    if (!this.state.isOpen) {
      return (
        <div>
          <span onClick={this.toggle}>{this.props.blog.title}</span> {this.props.blog.author}
        </div>  
      )
    } else {
      return (
        <div style={blogStyle}>
          <span onClick={this.toggle}>{this.props.blog.title}</span> {this.props.blog.author}<br />
          Likes: {this.props.blog.likes} <button onClick={this.props.likeFunction} >like</button><br />
          <a href={this.props.blog.url} target="_blank" >{this.props.blog.url}</a>
        </div>  
      )
    }
  }
}

export default Blog