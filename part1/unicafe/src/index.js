import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statisticks = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text} 
  </button>
)

const App = (props) => {
  const [good, setGood] = useState(0)
  const increaseByOne1 = () => setGood(good +1)
  const [neutral, setNeutral] = useState(0)
  const increaseByOne2 = () => setNeutral(neutral +1)
  const [bad, setBad] = useState(0)
  const increaseByone3 = () => setBad(bad +1)

 


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseByOne1} text='good' />
      <Button handleClick={increaseByOne2} text='neutral' />     
      <Button handleClick={increaseByone3} text='bad' /> 
      <h2>statistics</h2>   
      <Statisticks text='good' value={good} />
      <Statisticks text='neutral' value={neutral} />
      <Statisticks text= 'bad' value={bad} />
      <Statisticks text='all' value={good + neutral + bad} />
      <Statisticks text='avarage' value={(good - bad )/(good + neutral + bad)}/>
      <Statisticks text='positive' value={good/(good + neutral + bad) * 100}/>  
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
