import React from 'react';
import { useSelector } from 'react-redux';
import { Footer } from '../../Footer/Footer'
import { NavBar } from '../../NavBar/NavBar';
import { ApplicationState } from '../../../store/rootReducer';
import { musicPlayer } from '../../../index';

export const HowToPlayPage: React.FC = () => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const appClassName = isFullScreen ? "app-max": "app";
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  musicPlayer.volume = musicVolume;
  return (
    <div className={`${appClassName} bg-light-${theme} fc-${theme}`}>
      <NavBar />
        <div className="page-wrapper">
          <p className="page-text"><b className="mr-2">How to play:</b>Use your arrow keys 
            <img className="text-img ml-2" src={`./assets/images/arrow_left_${theme}.ico`} alt="arrow left"/>
            <img className="text-img" src={`./assets/images/arrow_up_${theme}.ico`} alt="arrow up"/>
            <img className="text-img" src={`./assets/images/arrow_down_${theme}.ico`} alt="arrow down"/>
            <img className="text-img mr-2" src={`./assets/images/arrow_right_${theme}.ico`} alt="arrow right"/>
            to move the tiles.
            When two tiles with the same number touch, they merge into one!
            You'll win when <b className="ml-1 mr-1">2048</b> number appear on field.
          </p>
        </div>
      <Footer />
    </div>
  );
};
//⬅ ⬆ ⬇ ➡ 