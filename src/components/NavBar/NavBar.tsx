import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Button, ButtonGroup,
        Dropdown, DropdownButton,
        Nav, Navbar, 
        OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { TOGGLE_BTNS_VISABILITY, TOGGLE_FULLSCREEN } from '../../store/actionTypes';


type NavBarProps = {
  handleShowLoginForm?: () => void
  handleShowSignUp?: () => void
}

export const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);

  const miximizeImgSrc = isFullScreen? "./assets/images/off_screen.ico" : "./assets/images/full_screen.ico" 
  if(window.location.pathname === '/') {
    return (
      <Navbar className={`bg-dark-${theme}`} bg="dark" variant="dark">
        <LinkContainer to="/" activeClassName="brand">
          <Navbar.Brand >
            2048
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="ml-auto">
          <ButtonGroup>
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">{t("navBar_tooltip_first_line")}<br/>{t("navBar_tooltip_second_line")}</Tooltip>}>
            <Button className="nav-btn" onClick={() => {dispatch({type: TOGGLE_BTNS_VISABILITY})}}>
              <img className="phone-img" id="full_screen" src="./assets/images/phone.ico" alt="phone"/>
            </Button>
          </OverlayTrigger>
          <DropdownButton className="navbar-btn" menuAlign='right' id="dropdown-menu-align-responsive-1"
            title={<img className="auth-img" src="./assets/images/auth.ico" alt="authorization" />}>
            <Dropdown.Item className="my-dropdown" eventKey="1" id="555" onClick={() => props.handleShowLoginForm()}>{t("navBar_auth_login")}</Dropdown.Item>
            <Dropdown.Item eventKey="2" id="666" onClick={() => props.handleShowSignUp()}>{t("navBar_auth_sign_up")}</Dropdown.Item>
          </DropdownButton>
          <Button className="nav-btn maximize-btn" onClick={() => dispatch({type: TOGGLE_FULLSCREEN})}>
            <img className="maximize-img" id="full_screen" src={miximizeImgSrc} alt="full screen"/>
          </Button>
          </ButtonGroup>
        </Nav>
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
