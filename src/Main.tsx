import React, { useState } from 'react';
import './styles/index.scss';
import { NavBar } from './components/NavBar/NavBar';
import { Field } from './components/Field/Field';
import { SignUpForm } from './components/RegForms/SignUpForm';
import { LoginForm } from './components/RegForms/LoginForm';
import { Footer } from './components/Footer/Footer';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store/rootReducer';

export const Main: React.FC = () => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleCloseLoginForm = () => setShowLoginForm(false);
  const handleShowLoginForm = () => setShowLoginForm(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const handleCloseSignUpForm = () => setShowSignUpForm(false);
  const handleShowSignUpForm = () => setShowSignUpForm(true);
  const appClassName = isFullScreen ? "app-max": "app";

  return (
    <div className={appClassName}>
      <NavBar handleShowLoginForm={handleShowLoginForm} handleShowSignUp={handleShowSignUpForm}/>
      <SignUpForm show={showSignUpForm} onHide={handleCloseSignUpForm}/>
      <LoginForm show={showLoginForm} onHide={handleCloseLoginForm}  />
      <Field />
      <Footer />
    </div>
  );
};
