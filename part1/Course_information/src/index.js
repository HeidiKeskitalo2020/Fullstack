import React from 'react'
import ReactDOM from 'react-dom'

const Header =(props) => {
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}
const Content =(props) => {
  return(
    <div>
      <p>{props.parts} </p>
    </div>
  )
}
const Total =(props) => {
  return(
    <div>
      <p>{props.total}</p>
    </div>
  )
}

const App = () => {
      const course = 'Half Stack application development'
      const part1 = 'undamentals of React'
      const exercises1 = 10 
      const part2 = 'Using props to pass data2' 
      const exercises2 = 7
      const part3 = 'State of a component' 
      const exercises3 = 14


  return (
    <div>
      <Header course = {course} />
      <Content parts={part1, part2, part3} />
      <Total total={exercises1, exercises2, exercises3} />
         
      
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
