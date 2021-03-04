import React from 'react';
import { ApplicationState } from '../../../store/rootReducer';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { NavBar } from '../../NavBar/NavBar';

export const AutoPlayPage: React.FC = () => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const appClassName = isFullScreen ? 'app-max' : 'app';

  return (
    <div className={`${appClassName} bg-light-${theme}`}>
      <NavBar />
      <div className="autoplay-page">
        <h3 className="autoplay-title">ENJOY THE SHOW</h3>
        <div className="autoplay-wrapper">
          <ReactPlayer playing={true} width={'100%'} height={'100%'} url="./assets/video/autoplay.mp4" />
        </div>
      </div>
    </div>
  );
};
