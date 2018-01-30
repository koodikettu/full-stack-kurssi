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

    lkm = (state) => (state.hyva + state.neutraali + state.huono)

    keskiarvo = (state) => {
        let summa = 0
        let lukumaara = this.lkm(state)
        summa += state.hyva
        summa -= state.huono
        if (lukumaara !== 0) {
            return Math.round(summa / lukumaara * 10) / 10
        }
        return undefined
    }

    positiiviset = (state) => {
        let lukumaara = this.lkm(state)
        if (lukumaara !== 0) {
            return Math.round(state.hyva / lukumaara * 1000) / 10
        }
        return undefined
    }

    hyva = () => {
        let currentState = Object.assign({}, this.state);
        currentState.hyva++;
        this.setState({
            hyva: currentState.hyva,
            keskiarvo: this.keskiarvo(currentState),
            positiiviset: this.positiiviset(currentState)
        })
    }

    neutraali = () => {
        let currentState = Object.assign({}, this.state);
        currentState.neutraali++;
        this.setState({
            neutraali: currentState.neutraali,
            keskiarvo: this.keskiarvo(currentState),
            positiiviset: this.positiiviset(currentState)
        })
    }

    huono = () => {
        let currentState = Object.assign({}, this.state);
        currentState.huono++;
        this.setState({
            huono: currentState.huono,
            keskiarvo: this.keskiarvo(currentState),
            positiiviset: this.positiiviset(currentState) 
        })
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
            Keskiarvo: { this.state.keskiarvo } <br />
            Positiivisia: {this.state.positiiviset} %<br /> 
        </div>
      )
    }
  }


ReactDOM.render(<App />, document.getElementById('root'));

