import React, { useState } from 'react';
import './styles/index.scss';
import { NavBar } from './components/Navbar/Navbar';
import { IndicatorPanel } from './components/Indicators/IndicatorPanel';
import { Field } from './components/Field/Field';
import { SignUpForm } from './components/RegForms/SignUpForm';
import { LoginForm } from './components/RegForms/LoginForm';
import { Footer } from './components/Footer/Footer';

export const Main: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleCloseLoginForm = () => setShowLoginForm(false);
  const handleShowLoginForm = () => setShowLoginForm(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const handleCloseSignUpForm = () => setShowSignUpForm(false);
  const handleShowSignUpForm = () => setShowSignUpForm(true);

  return (
    <div className="app">
      <NavBar handleShowLoginForm={handleShowLoginForm} handleShowSignUp={handleShowSignUpForm}/>
      <SignUpForm show={showSignUpForm} onHide={handleCloseSignUpForm}/>
      <LoginForm show={showLoginForm} onHide={handleCloseLoginForm}  />
      <IndicatorPanel />
      <Field />
      <Footer />
    </div>
  );
};
