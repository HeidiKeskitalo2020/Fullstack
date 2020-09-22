import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const random =() => {
    setSelected(Math.floor(Math.random() * 6 ))
  }  
  
  const votes = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0);
  const [countVote, setVote] = useState(votes)
  const countVoteCopy = [...countVote]
  
  countVoteCopy[selected] += 1   
  const vote = () => setVote(countVoteCopy)

  const largestNumberOfVotes = countVote.indexOf(Math.max.apply(null, countVote)) 
  
  const buttons = <Buttons random={random} vote={vote} />
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
     
      <p>has {countVote[selected]} votes</p>  
      <>{buttons}</> 
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[largestNumberOfVotes]}</p>
      <p>has {countVote[largestNumberOfVotes]} votes</p>

    </div>
  )
}


const Buttons = ({ vote, random}) => {
  return (
    <div>
    <Button handleClick={vote} text='vote' />
    <Button handleClick={random} text='next anecdote' />     
    </div>
  )
}
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text} </button>)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
