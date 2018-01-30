import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
  <h1>{props.kurssi}</h1>
)

const Sisalto = (props) => {
  const Osat = (props) => (
    props.osat.map((osa) => <Osa key = { osa.nimi } osa={osa} />)
  )
  return (
    <div>
      <Osat osat={props.osat} />
    </div>
  )

}

const Yhteensa = (props) => {
  let yhteensa = 0
  props.osat.forEach((osa) => {
    yhteensa += osa.tehtavia
  })
  return (
    <p>yhteensa {yhteensa} tehtävää</p>
  )
  
}

const Osa = (props) => (
  <p>{props.osa.nimi} {props.osa.tehtavia}</p>
)



const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)