import React from 'react'
import axios from 'axios'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import './styles.css';

import Notes from './Components/Notes'


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      todos: []
    }

    axios.get('http://localhost:5000/api/v1/todos').then(res => {
      this.setState({todos: res.data.todos})
    })
  }

  render(){
    return (
      <>
        <Navbar className='mb-3' color="light" expand="md">
          <NavbarBrand className='text-center' href="/">Home</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>Create</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>About</NavLink>
              </NavItem>
            </Nav>
        </Navbar>

        <div className='App'>
          <Notes todos={this.state.todos} />
        </div>
      </>
    )
  }

}

export default App;
