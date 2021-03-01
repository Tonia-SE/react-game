import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Button, ButtonGroup,
        Dropdown, DropdownButton,
        Nav, Navbar, 
        OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { LOGOUT_USER, TOGGLE_BTNS_VISABILITY, TOGGLE_FULLSCREEN } from '../../store/actionTypes';

type AuthBtnProps = {
  handleShowLoginForm?: () => void
  handleShowSignUp?: () => void
}

export const AuthBtn: React.FC<AuthBtnProps> = (props: AuthBtnProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const isLoggedIn = useSelector((state: ApplicationState) => state.auth.isLoggedIn);
  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])
  
  if(!isLoggedIn){
    return (
      <DropdownButton className="navbar-btn" menuAlign='right' id="dropdown-menu-align-responsive-1"
        title={<img className="auth-img" src="./assets/images/auth.ico" alt="authorization" />}>
          {!isLoggedIn && <Dropdown.Item className="my-dropdown" eventKey="1" id="555" onClick={() => props.handleShowLoginForm()}>{t("navBar_auth_login")}</Dropdown.Item>}
          {isLoggedIn && <Dropdown.Item className="my-dropdown" eventKey="1" id="555" onClick={() => {dispatch({type: LOGOUT_USER})}}>{t("navBar_auth_logout")}</Dropdown.Item>}
        <Dropdown.Item eventKey="2" id="666" onClick={() => props.handleShowSignUp()}>{t("navBar_auth_sign_up")}</Dropdown.Item>
      </DropdownButton>
    );
  } else {
    return (
      <Button className="navbar-btn" onClick={() => {dispatch({type: LOGOUT_USER})}}>
        <img className="auth-img" src="./assets/images/logout.ico" alt="logout" />
      </Button>
    )
  }
    
} 
