import React from 'react'

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

    export default Course