import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button } from 'reactstrap';

class Header extends React.Component{

  render(){
    return(
      <Navbar className='mb-3' color="light" expand="md">
        <NavbarBrand className='text-center' href="/">Home</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavLink>About</NavLink>
          <NavLink>Sign up</NavLink>
          <NavLink>Log in</NavLink>
          <Button>Create Post</Button>
        </Nav>
      </Navbar>
    )
  }
}

export default Header
