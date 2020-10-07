import React from 'react'

const Persons = ({persons, filter, removePerson}) => {
        const personFilter = persons
        .filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())) 
            return (
                <div>
                     {personFilter.map(persons => <li key={persons.name}>{persons.name} {persons.number}
                         <button onClick={() => removePerson(persons.id)}>delete</button></li>)}
                 </div>
    )
}

export default Persons