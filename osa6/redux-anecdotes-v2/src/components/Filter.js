import React from 'react'
import { actionForFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      console.log(event.target.value)
      console.log(this.props.store.getState())
      this.props.store.dispatch(actionForFilter.setFilter(event.target.value))

    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input value={this.props.store.getState().filter} onChange={this.handleChange}/>
        </div>
      )
    }
  }

  export default Filter