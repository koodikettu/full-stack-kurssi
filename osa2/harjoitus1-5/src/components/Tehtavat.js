import React from 'react'

const Tehtavat = ({ kurssi }) => {
    const tehtavat = kurssi.osat.map(osa => osa.tehtavia)
    const reducer = (acc, curr) => acc + curr

  return (
    <p>yhteensä { tehtavat.reduce(reducer)} tehtävää</p>
  )
}

export default Tehtavat