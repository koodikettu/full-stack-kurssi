import React from 'react'

class FilterForm extends React.Component {
    render() {
        return (
        <div>
        rajaa näytettäviä: <input value={this.props.filter} onChange={this.props.handleChange} />  
        </div>
        )
    }
}

export default FilterForm