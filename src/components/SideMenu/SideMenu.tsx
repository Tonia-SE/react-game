import React from 'react';
import { Link } from 'react-router-dom';

export const SideMenu: React.FC = () => {
  return (
    <div className="side-menu-wrapper">
      <Link to="#"><img className="menu-img rise" id="full_screen" src="./assets/images/full_screen.ico" alt="instructions"/></Link>
      <Link to="#"><img className="menu-img" src="./assets/images/instructions2.ico" alt="instructions"/></Link>
      <Link to="#"><img className="menu-img" src="./assets/images/settings2.ico" alt="settings"/></Link>
      <Link to="#"><img className="menu-img rise" src="./assets/images/winners2.ico" alt="winners"/></Link>
    </div>
  );
};