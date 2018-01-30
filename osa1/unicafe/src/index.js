import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.callBack}> {props.nimi} </button>
)

const Statistics = ({state}) => {
    const tulokset = state.keskiarvo
    if (tulokset !== undefined) {
        return (
            <div>
                <h2> Tulokset </h2>
                <table>
                    <tbody>

                        <Statistic nimi="Hyvä" arvo={state.hyva} />
                        <Statistic nimi="Neutraali" arvo={state.neutraali} />
                        <Statistic nimi="Huono" arvo={state.huono} />
                        <Statistic nimi="Keskiarvo" arvo={state.keskiarvo} />
                        <Statistic nimi="Positiivisia" arvo={state.positiiviset} />
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                ei yhtään palautetta annettu
            </div>
        )
    }

}

const Statistic = (props) => (
    <tr>
        <td>
            { props.nimi }
        </td>
        <td>
            {props.arvo}
        </td>    
    </tr>
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

    klikki = (property) => {
        return () => {
            let newState = Object.assign({}, this.state);
            newState[property]++;
            newState.keskiarvo = this.keskiarvo(newState)
            newState.positiiviset = this.positiiviset(newState)
            this.setState(newState)
        }

    }

    render(){
      return (
        <div>
            <h2>Anna palautetta</h2>
            <Button callBack={this.klikki('hyva')} nimi="hyvä" />
            <Button callBack={this.klikki('neutraali')} nimi="neutraali" />
            <Button callBack={this.klikki('huono')} nimi="huono" />
            <Statistics state={this.state} />
        </div>
      )
    }
  }


ReactDOM.render(<App />, document.getElementById('root'));

