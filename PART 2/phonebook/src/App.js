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
      id: persons.length + 1,
    
    }
    personService
    .create(personObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
    })


      if (persons.some(person =>
      person.name === newName)) {
        window.alert(`${newName} is already added to phonebook`);
      }
      else
      {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
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
  
  const removePerson = (id) => {
    console.log('pressing delete button')
    const pers = persons.find((pers) => pers.id === id);
    if (window.confirm(`Delete ${pers.name} ?`)) 

      personService
      .remove(id)
      .then(response => {
        const del = persons.filter(persons => id !==persons.id)
        console.log('deleting', id)
        setPersons(del)
      })

    }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilterChange= {handleFilterChange} />
      
      <h3>add a new</h3>
      <PersonForm name={newName} handlePersonChange= {handlePersonChange} handleNumberChange={handleNumberChange} number={newNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} remove={removePerson}/>
    </div>
    )
  }
 

export default App