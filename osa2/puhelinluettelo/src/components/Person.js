import React from 'react'



class Person extends React.Component {
    render() {
        return (
            <div>
            { this.props.person.name } {this.props.person.number}
            <button onClick={this.props.handleRemove}>Poista </button>
            </div>
          )
    }
}

export default Person
