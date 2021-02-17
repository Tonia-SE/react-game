import React, { useState } from 'react';
import { Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

type NavBarProps = {
  handleShowLoginForm: () => void
  handleShowSignUp: () => void
}

export const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="my-navbar">
        <Navbar.Brand className="brand" href="#home">
          2048
        </Navbar.Brand>
        <Nav>
          <DropdownButton className="navbar-btn" menuAlign='right' title={<img className="auth-img" src="./assets/images/auth.ico" alt="authorization" />} id="dropdown-menu-align-responsive-1">
            <Dropdown.Item className="my-dropdown" eventKey="1" id="555" onClick={() => props.handleShowLoginForm()}>LOGIN</Dropdown.Item>
            <Dropdown.Item eventKey="2" id="666" onClick={() => props.handleShowSignUp()}>SIGN UP</Dropdown.Item>
          </DropdownButton>
        </Nav>
      </div>
    </Navbar>
  );
};
