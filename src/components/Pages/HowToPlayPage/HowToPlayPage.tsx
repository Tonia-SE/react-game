import React from 'react';
import { useSelector } from 'react-redux';
import { Footer } from '../../Footer/Footer'
import { NavBar } from '../../NavBar/NavBar';
import { ApplicationState } from '../../../store/rootReducer';

export const HowToPlayPage: React.FC = () => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const appClassName = isFullScreen ? "app-max": "app";
  return (
    <div className={appClassName}>
      <NavBar />
        <div className="page-wrapper">
          <p className="page-text"><b className="mr-1">How to play:</b>Use your arrow keys 
            <img className="text-img ml-1" src="./assets/images/arrow_left.ico" alt="arrow left"/>
            <img className="text-img" src="./assets/images/arrow_up.ico" alt="arrow up"/>
            <img className="text-img" src="./assets/images/arrow_down.ico" alt="arrow down"/>
            <img className="text-img mr-1" src="./assets/images/arrow_right.ico" alt="arrow right"/>
            to move the tiles.
            When two tiles with the same number touch, they merge into one!
            You'll win when <b>2048</b> number appear on field.
          </p>
        </div>
      <Footer />
    </div>
  );
};
//⬅ ⬆ ⬇ ➡ 