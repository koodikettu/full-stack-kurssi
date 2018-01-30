import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.callBack}> {props.nimi} </button>
)

const Statistics = ({state}) => (
    <div>
        <h2> Tulokset </h2>
        <Statistic nimi="Hyvä" arvo={state.hyva} />
        <Statistic nimi="Neutraali" arvo={state.neutraali} />
        <Statistic nimi="Huono" arvo={state.huono} />
        <Statistic nimi="Keskiarvo" arvo={state.keskiarvo} />
        <Statistic nimi="Positiivisia" arvo={state.positiiviset} />
    </div>

)

const Statistic = (props) => (
    <div>
        { props.nimi }: {props.arvo}    
    </div>
)

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
            return Math.round(state.hyva / lukumaara * 1000) / 10 + " %"
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
            <Button callBack={this.hyva} nimi="hyvä" />
            <Button callBack={this.neutraali} nimi="neutraali" />
            <Button callBack={this.huono} nimi="huono" />
            <Statistics state={this.state} />
        </div>
      )
    }
  }


ReactDOM.render(<App />, document.getElementById('root'));

