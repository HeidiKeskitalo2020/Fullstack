import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>  {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content =(props) => {
  return(
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </div>
  )
}
const Part =(props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}
const Total =(props) => {
  return(
    <div>
      <p>total of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}
const Course =({course}) => {
    return(
      <div>
        <Header course = {course.name}  />
        <Content course = {course} />
        <Total parts= {course.parts} />
      </div>
    )
  }

const App = () => {
    const course = {
      
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }
    
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }
 

ReactDOM.render(<App />, document.getElementById('root'))
