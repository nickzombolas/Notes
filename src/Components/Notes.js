import React from 'react'
import { Input, Button } from 'reactstrap'



class Notes extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      todos: this.props.todos
    }
  }

  renderTodos(){
    const { todos } = this.props
    let notes = todos.map((todo, i) => {
      return (
        <div key={i} className='card m-3'>
          <h2 className='pt-3'>{ todo.title }</h2>
          <div className='card-body'>{ todo.description }</div>
        </div>
      )
    })
    return notes
  }

  render(){
    const { todos } = this.props
    return(
      <div>
        { todos.length > 0 && this.renderTodos() }
      </div>
    )
  }
}

export default Notes