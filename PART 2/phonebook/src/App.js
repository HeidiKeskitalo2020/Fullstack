import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      //id: persons.length + 1,
    }

    if (persons.every((person) => person.name.toLowerCase() !== newName.toLocaleLowerCase()))
    {
    personService
    .create(personObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

      else if (window.confirm(`${newName} is already added to phonebook,
      replace the old number with a new one?`))
            
      {
        updatePerson(personObject)
      }
  }

  const updatePerson = (person) => {
    const identity = persons.find(w => w.name.toLowerCase() === person.name.toLowerCase()).id
    person = {...person, id: identity}

    personService
    .update(identity, person)
      .then(returnedPerson => {
      setPersons(persons.map(w => w.id !== identity ? w : returnedPerson))
      setNewName('')
      setNewNumber('')
      })
  }

  const removePerson = (id) => {
    console.log('pressing delete button')
    const person = persons.find(z => z.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) 

      {personService
      .remove(id)
      .then()
      setPersons(persons.filter(z => id !== z.id))
      }

    }
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilterChange= {handleFilterChange} />
      
      <h3>add a new</h3>
      <PersonForm name={newName} handlePersonChange= {handlePersonChange} handleNumberChange={handleNumberChange} number={newNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
    )
  
  }

export default App