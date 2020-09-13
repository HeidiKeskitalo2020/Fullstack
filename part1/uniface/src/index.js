import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const increaseByOne1 = () => setGood(good +1)
  const [neutral, setNeutral] = useState(0)
  const increaseByOne2 = () => setNeutral(neutral +1)
  const [bad, setBad] = useState(0)
  const increaseByone3 = () => setBad(bad +1)

  
  const  Display = ({ counter }) => <div>{counter}</div>

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )
  
  return (
    <div>
      <h1>give feedback</h1>
       <Button
        handleClick={increaseByOne1}
        text='good'
      />
      <Button
        handleClick={increaseByOne2}
        text='neutral'
      />     
      <Button
        handleClick={increaseByone3}
        text='bad'
      />    
      <h2>statistics</h2>   
          
      <p>good </p>
      <Display counter ={good}/>
      
      <p>neutral </p>
      <Display counter ={neutral}/>
      
      <p>bad </p>
      <Display counter ={bad}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
