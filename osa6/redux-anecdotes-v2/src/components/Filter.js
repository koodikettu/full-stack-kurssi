import React from 'react'
import { connect } from 'react-redux'
import { actionForFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      this.props.setFilter(event.target.value)

    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input value={this.props.filter} onChange={this.handleChange}/>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
  }
  
  const ConnectedFilter = connect(mapStateToProps, { setFilter: actionForFilter.setFilter })(Filter)

  export default ConnectedFilter