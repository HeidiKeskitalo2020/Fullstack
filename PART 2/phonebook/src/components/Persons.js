import React from 'react'

const Persons = ({persons, filter}) => {
    return (
        <div> {persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
            <li key={person.name}>{person.name} {person.number}</li>)}
        </div>
    )
}

export default Persons