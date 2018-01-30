import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }

    hyva = () => {
        this.setState({ hyva: this.state.hyva + 1})
    }

    neutraali = () => {
        this.setState({ neutraali: this.state.neutraali + 1})
    }

    huono = () => {
        this.setState({ huono: this.state.huono + 1})
    }


    render(){
      return (
        <div>
            <h2>Anna palautetta</h2>
            <button onClick={this.hyva}> hyvä </button>
            <button onClick={this.neutraali}> neutraali </button>
            <button onClick={this.huono}> huono </button>
            <h2> Tulokset </h2>
            Hyvä: { this.state.hyva } <br />
            Neutraali: { this.state.neutraali } <br />
            Huono: { this.state.huono } <br />
        </div>
      )
    }
  }


ReactDOM.render(<App />, document.getElementById('root'));

