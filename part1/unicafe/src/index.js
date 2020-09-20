import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text= 'bad' value={bad} />
      <StatisticLine text='all' value={good + neutral + bad} />
      <StatisticLine text='avarage' value={(good - bad )/(good + neutral + bad)}/>
      <StatisticLine text='positive' value={good/(good + neutral + bad) * 100} />  
    </div>
  )
}
const StatisticLine = ({text, value}) => (<Display text={text} value={value} />)

const Display = (props) => {
  return (
  <div>{props.text} {props.value}</div>
  )
}

const Button = ({ increaseByOne1, increaseByOne2, increaseByone3}) => {
  return (
    <div>
    <Button handleClick={increaseByOne1} text='good' />
    <Button handleClick={increaseByOne2} text='neutral' />     
    <Button handleClick={increaseByone3} text='bad' />  
    </div>
  )
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseByOne1 = () => setGood(good +1)
  const increaseByOne2 = () => setNeutral(neutral +1)
  const increaseByone3 = () => setBad(bad +1)

  const statistics = <Statistics good={good} neutral={neutral} bad={bad} />
  const buttons = <Button increaseByOne1={increaseByOne1} increaseByOne2={increaseByOne2} increaseByone3={increaseByone3} />

  if (good + neutral + bad === 0) {
  return (
    <div>
      <h1>give feedback</h1>
      <>{buttons}</>
      <h2>statistics</h2>   
      <p>No feedback given</p>
    </div>
  )
}
  return (
    <div>
      <h1>give feedback</h1>
      <>{buttons}</>
      <h2>statistics</h2>   
      <>{statistics}</>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
