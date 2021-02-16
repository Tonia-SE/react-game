import React from 'react';
import { Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

export const NavBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="my-navbar">
        <Navbar.Brand className="brand" href="#home">
          2048
        </Navbar.Brand>
        <Nav>
          <div>
            <DropdownButton className="navbar-btn" menuAlign={{ lg: 'right' }} title="Auth" id="dropdown-menu-align-responsive-1">
              <Dropdown.Item eventKey="1">LOGIN</Dropdown.Item>
              <Dropdown.Item eventKey="2">SIGN UP</Dropdown.Item>
            </DropdownButton>
          </div>
        </Nav>
      </div>
    </Navbar>
  );
};
