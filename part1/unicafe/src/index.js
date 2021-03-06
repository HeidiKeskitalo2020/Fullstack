import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseByOne1 = () => setGood(good +1)
  const increaseByOne2 = () => setNeutral(neutral +1)
  const increaseByone3 = () => setBad(bad +1)

  const statistics = <Statistics good={good} neutral={neutral} bad={bad} />
  const buttons = <Buttons increaseByOne1={increaseByOne1} increaseByOne2={increaseByOne2} increaseByone3={increaseByone3} />

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

const Statistics = ({good, neutral, bad}) => {
  return (     
   <table>
    <thead>
      <tr>
        <td><StatisticLine text='good'value={good}/></td>
      </tr>
      <tr>
        <td><StatisticLine text='neutral'value={neutral}/></td>
      </tr>
      <tr>
        <td><StatisticLine text= 'bad'value={bad}/></td>
      </tr>
      <tr>
        <td><StatisticLine text='all'value={good + neutral + bad}/></td>
      </tr>
      <tr>
        <td><StatisticLine text='avarage'value={(good - bad )/(good + neutral + bad)}/></td>
      </tr>
      <tr>      
        <td><StatisticLine text='positive'value={good/(good + neutral + bad) * 100 }text1='%'/></td> 
      </tr>
    </thead>
    </table>
  )
}
const StatisticLine = ({text, value, text1}) => (<Display text={text} value={value} text1={text1}/>)

const Display = (props) => {
  return (
  <div>{props.text} {props.value} {props.text1}</div>
  )
}

const Button = ({handleClick, text}) => (<button onClick={handleClick}> {text} </button>)

const Buttons = ({ increaseByOne1, increaseByOne2, increaseByone3}) => {
  return (
    <div>
    <Button handleClick={increaseByOne1} text='good' />
    <Button handleClick={increaseByOne2} text='neutral' />     
    <Button handleClick={increaseByone3} text='bad' />  
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)
