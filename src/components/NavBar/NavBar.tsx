import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TOGGLE_BTNS_VISABILITY, TOGGLE_FULLSCREEN } from '../../store/actionTypes';
import { ApplicationState } from '../../store/rootReducer';

type NavBarProps = {
  handleShowLoginForm?: () => void
  handleShowSignUp?: () => void
}

export const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  //const RightSideMenuClassName = 'none';

  const miximizeImgSrc = isFullScreen? "./assets/images/off_screen.ico" : "./assets/images/full_screen.ico" 
  if(window.location.pathname === '/') {
    return (
      <Navbar bg="dark" variant="dark" style={{width: '100%'}} >
        {/* <div className="my-navbar"> */}
          <Navbar.Brand href="/">
            2048
          </Navbar.Brand>
          <Nav className="ml-auto">
          <ButtonGroup>
          <OverlayTrigger placement="bottom" overlay={<Tooltip className="display-none" id="tooltip-disabled">push to play<br/>without keyboard</Tooltip>}>
            <Button className="nav-btn" onClick={() => dispatch({type: TOGGLE_BTNS_VISABILITY})}>
              <img className="phone-img" id="full_screen" src="./assets/images/phone.ico" alt="phone"/>
            </Button>
          </OverlayTrigger>
            {/* <div className="nav-btn"> */}
              <DropdownButton className="navbar-btn" menuAlign='right' title={<img className="auth-img" src="./assets/images/auth.ico" alt="authorization" />} id="dropdown-menu-align-responsive-1">
                <Dropdown.Item className="my-dropdown" eventKey="1" id="555" onClick={() => props.handleShowLoginForm()}>LOGIN</Dropdown.Item>
                <Dropdown.Item eventKey="2" id="666" onClick={() => props.handleShowSignUp()}>SIGN UP</Dropdown.Item>
              </DropdownButton>
            {/* </div> */}
            <Button className="nav-btn maximize-btn" onClick={() => dispatch({type: TOGGLE_FULLSCREEN})}>
              <img className="maximize-img" id="full_screen" src={miximizeImgSrc} alt="full screen"/>
            </Button>
            </ButtonGroup>
          </Nav>
        {/* </div> */}
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="dark" variant="dark">
        <div className="my-navbar">
          <Navbar.Brand className="brand" href="/">
            2048
          </Navbar.Brand>
          <Nav>
            <Button className="nav-btn" onClick={() => dispatch({type: TOGGLE_FULLSCREEN})}>
              <img className="maximize-img" id="full_screen" src={miximizeImgSrc} alt="full screen"/>
            </Button>
          </Nav>
        </div>
      </Navbar>
    );
  }
};
