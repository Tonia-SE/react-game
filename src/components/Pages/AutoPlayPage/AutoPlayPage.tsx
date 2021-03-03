import React from 'react';
import { ApplicationState } from '../../../store/rootReducer';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Footer } from '../../Footer/Footer';
import { NavBar } from '../../NavBar/NavBar';

export const AutoPlayPage: React.FC = () => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const appClassName = isFullScreen ? 'app-max' : 'app';
  const videoHeight = isFullScreen ? '70vh' : '460px';

  return (
    <div className={`${appClassName} bg-light-${theme}`}>
      <NavBar />
      <div className="best-results page">
        <h3 className="mb-5">
          <b>ENJOY THE SHOW</b>
        </h3>
        <ReactPlayer className="autoplay-player" controls={true} playing={true} muted={true} url="./assets/video/autoplay.mp4" height={videoHeight} />
      </div>
      <Footer />
    </div>
  );
};
