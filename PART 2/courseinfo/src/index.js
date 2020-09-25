import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>  {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}
const Content =({course}) => {
  return(
    <div>
    {course.parts.map(c =>
      <Part key={c.id} name={c.name} exercises={c.exercises} />)}
    </div>
  )
}
const Part =(props) => {
  return (
    
      <p>
        {props.name} {props.exercises}
      </p>
    
  )
}
const Total = ({course}) => {
    const totalsum = course.parts.reduce((prevValue, currentValue) => prevValue + currentValue.exercises, 0)
        return (
        <div>
            <p><b>total of {totalsum} exercises</b></p>
        </div>
        )
    } 

const Course =({course}) => {
    return(
      <div>
        <Header course = {course}  />
        <Content course = {course} />
        <Total course = {course} />
      </div>
    )
  }

  const App = () => {
    const courses = [
      {
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
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    
    return (
      <div>
          <h1>Web development curriculum</h1>
        {courses.map(course => 
          <Course key={course.id} course={course} />
        )}
      </div>
    )
}
 

ReactDOM.render(<App />, document.getElementById('root'))
