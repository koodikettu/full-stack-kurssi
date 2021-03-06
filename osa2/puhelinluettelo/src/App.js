import React from 'react';
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import personService from './services/persons'
import Notification from './components/Notification'
import styles from './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterValue: '',
      personsToShow: [],
      error: null
    }
    this.personsToShow = this.state.persons
    this.addPerson = (e) => {
      e.preventDefault()
      let newState = Object.assign(this.state)
      const personObject = {name: this.state.newName, number: this.state.newNumber}
      const existingPerson = this.state.persons.find(p => p.name === personObject.name)
      if (existingPerson) {
        personService.update(existingPerson.id, personObject).then(response => {
          existingPerson.number = this.state.newNumber
          this.setState({
            error: `Päivitettiin henkilön ${existingPerson.name} puhelinnumero ${existingPerson.number}`,
            newName: '',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 2000)
        }).catch(error => {
          console.log(error)
        })
      } else {
        personService.create(personObject).then(response => {
          const newPersons = this.state.persons.concat(response.data)
          this.setState({
            persons: newPersons,
            personsToShow: newPersons.filter(person =>
              person.name.toLowerCase().includes(this.state.filterValue.toLowerCase())),
            error: `Lisättiin henkilö '${personObject.name}'`,
            newName: '',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 2000)
        }).catch(error => {
          console.log(error)
        })
      }

    }

    this.removePerson = (person) => {
      return () => {
        const result = window.confirm('Poistetaanko ' + person.name + '?')
        if (result) {
          personService.remove(person.id).then(response => {
            const newPersons = this.state.persons.filter(p => p.id !== person.id)
            this.setState({
              persons: newPersons,
              personsToShow: newPersons.filter(person =>
                person.name.toLowerCase().includes(this.state.filterValue.toLowerCase()))
            })
            this.setState({
              error: `Poistettiin henkilö '${person.name}'`
            })
            setTimeout(() => {
              this.setState({error: null})
            }, 2000)
          }).catch(error => {
            console.log(error)
          })

        }
      }
    }

    this.handleNameChange = (e) => {
      this.setState({newName: e.target.value})
    }
    this.handleNumberChange = (e) => {
      this.setState({newNumber: e.target.value})
    }
    this.handleFilterChange = (e) => {
      this.setState({filterValue: e.target.value})
      this.setState({personsToShow: this.state.persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))})
    }
  }

  componentWillMount() {
    personService.getAll()
      .then(response => {
        this.setState({ persons: response.data, personsToShow: response.data })
      })
  }
  

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.error}/>
        <FilterForm filter={this.state.filterValue} handleChange={this.handleFilterChange} />
        <form>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button onClick={this.addPerson} type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        { this.state.personsToShow.map(person => <Person key={person.id} person={person} handleRemove={this.removePerson(person)}/>)}
      </div>
    )
  }
}

export default App

