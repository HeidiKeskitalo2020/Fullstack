import React from 'react'


const flagstyle= {
    width: '100px'
}

const SingleCountry = ({ country }) => {
    
  return (
    <div>
        <h1>{country.name}</h1>
        <p>Capital {country.capital} <br />
        Population {country.population}</p>
        <h2>Languages </h2>
        <ul>
            {country.languages.map(l => <li key= {l.iso639_1}>{l.name}</li>)} 
        </ul>
        <br />
        <img src={country.flag} style={flagstyle} alt={country.name} />
    
    </div>
)}

export default SingleCountry