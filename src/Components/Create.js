import React from 'react'
import { Input, Button } from 'reactstrap'
import axios from 'axios'

class Create extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      title: undefined,
    description: undefined
    }
  }

  handleSubmit = (e) => {
    console.log(this.state.title, this.state.description)
    // axios.get('http://localhost:5000/api/v1/todos').then(
    //     console.log('getsent')
    // )
    e.preventDefault()
  }

  handleChangeTitle = (e) => {
    console.log('change')
      this.setState({
        title: e.target.value
      })
  }

  handleChangeDescription = (e) => {
    console.log('change description')
    this.setState({
        description: e.target.value
    })
  }

  render(){
    let newTitle
    let newDescription

    return(
      <div>
        <h2>Create</h2>
        <form onSubmit={this.handleSubmit}>
          <Input onChange={this.handleChangeTitle} name='title' value={this.state.title} placeholder='Title'></Input>
          <Input onChange={this.handleChangeDescription} name='description' value={this.state.description} placeholder='Description'></Input>
          <Button type='submit'>Send</Button>
        </form>
      </div>
    )
  }
}

export default Create