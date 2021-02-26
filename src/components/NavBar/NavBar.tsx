import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  //const RightSideMenuClassName = 'none';

  const miximizeImgSrc = isFullScreen? "./assets/images/off_screen.ico" : "./assets/images/full_screen.ico" 
  if(window.location.pathname === '/') {
    return (
      <Navbar className={`bg-dark-${theme}`} bg="dark" variant="dark">
        {/* <div className="my-navbar"> */}
          <LinkContainer to="/" activeClassName="brand">
            <Navbar.Brand >
              2048
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
          <ButtonGroup>
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">push to play<br/>without keyboard</Tooltip>}>
            <Button className="nav-btn" onClick={() => {dispatch({type: TOGGLE_BTNS_VISABILITY})}}>
              <img className="phone-img" id="full_screen" src="./assets/images/phone.ico" alt="phone"/>
            </Button>
          </OverlayTrigger>
            {/* <div className="nav-btn"> */}
              <DropdownButton className="navbar-btn" menuAlign='right' id="dropdown-menu-align-responsive-1"
                title={<img className="auth-img" src="./assets/images/auth.ico" alt="authorization" />}>
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
      <Navbar className={`bg-dark-${theme}`} bg="dark" variant="dark" >
        <div className="my-navbar">
          <LinkContainer to="/" activeClassName="brand">
            <Navbar.Brand className="brand">
              2048
            </Navbar.Brand>
          </LinkContainer>  
          <Nav>
            <Button className="nav-btn maximize-btn" onClick={() => dispatch({type: TOGGLE_FULLSCREEN})}>
              <img className="maximize-img" id="full_screen" src={miximizeImgSrc} alt="full screen"/>
            </Button>
          </Nav>
        </div>
      </Navbar>
    );
  }
};
