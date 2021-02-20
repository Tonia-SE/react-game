import React, { useState } from 'react';
import './styles/index.scss';
import { NavBar } from './components/NavBar/NavBar';
import { Field } from './components/Field/Field';
import { SignUpForm } from './components/RegForms/SignUpForm';
import { LoginForm } from './components/RegForms/LoginForm';
import { Footer } from './components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from './store/rootReducer';
import { handleMove } from './store/actions';
import { useEffect } from 'react';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const field = useSelector((state: ApplicationState) => state.game.field);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleCloseLoginForm = () => setShowLoginForm(false);
  const handleShowLoginForm = () => setShowLoginForm(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const handleCloseSignUpForm = () => setShowSignUpForm(false);
  const handleShowSignUpForm = () => setShowSignUpForm(true);
  const appClassName = isFullScreen ? "app-max": "app";
  let rootDiv: HTMLElement = null

  useEffect(() => {
    rootDiv.focus();
  })

  function handleKeyPress(keyEvent: React.KeyboardEvent) {
    const arrowKeyEvents = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (arrowKeyEvents.indexOf(keyEvent.key) !== -1) {
      dispatch(handleMove(field, keyEvent.key))
    }
  }  
  
  return (
    <div className={appClassName}  tabIndex={1} onKeyDown={handleKeyPress} ref={(c:HTMLElement) => {rootDiv = c}}>
      <NavBar handleShowLoginForm={handleShowLoginForm} handleShowSignUp={handleShowSignUpForm}/>
      <SignUpForm show={showSignUpForm} onHide={handleCloseSignUpForm}/>
      <LoginForm show={showLoginForm} onHide={handleCloseLoginForm}  />
      <Field />
      <Footer />
    </div>
  );
};
