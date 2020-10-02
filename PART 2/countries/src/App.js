import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Countries from './components/Countries'



const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const onClickHandler = (event) => {
    setFilter(event.target.value)
  }
  

  return (
    <div>
      
      <Filter value={filter} handleFilterChange= {handleFilterChange} />
      < br />   
      <Countries countries={countries} filter={filter} onClickHandler={onClickHandler} />
    </div>
)}

export default App