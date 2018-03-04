import React from 'react'
import PropTypes from 'prop-types'

class BlogForm extends React.Component {

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.props.submitFunction}>
                    title <input type="text" name="title" value={this.props.title} onChange={this.props.handleFieldChange} /><br />
                    author <input type="text" name="author" value= {this.props.author} onChange={this.props.handleFieldChange} /><br />
                    url <input type="text" name="url" value={ this.props.url} onChange={this.props.handleFieldChange} /><br />
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

BlogForm.propTypes = {
    submitFunction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired
  }

export default BlogForm 