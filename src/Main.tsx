import React from 'react';
import './styles/index.scss';
import { NavBar } from './components/Navbar/Navbar';
import { Score } from './components/Score/Score';
import { Field } from './components/Field/Field';
import { Footer } from './components/Footer/Footer';

export const Main: React.FC = () => {
  return (
    <div className="app">
      <NavBar />
      <Score />
      <Field />
      <Footer />
    </div>
  );
};
