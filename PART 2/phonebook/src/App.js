import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }
  

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
            name: <input />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     
          {persons.map(person => 
          <div key={person.name}> {person.name} 
          </div>
        )}
    </div>
  )

}

export default App