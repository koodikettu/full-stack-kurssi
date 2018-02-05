import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Tehtavat from './Tehtavat'

const Kurssi = ({ kurssi }) => {
  return (
    <div>
        <Otsikko otsikko={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
        <Tehtavat kurssi={kurssi} />
    </div>

  )
}

export default Kurssi
