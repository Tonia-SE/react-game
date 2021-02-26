import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

export const IndicatorPanel: React.FC = () => {
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const score = useSelector((state: ApplicationState) => state.game.score);
  const currentSum = useSelector((state: ApplicationState) => state.game.currentSum);
  const indicatorPanelClassName = isFullScreen ? "indicators-wrapper-max": "indicators-wrapper";
  const fontSize = isFullScreen ? "indicator-main-max": "indicator-main";
  const none = isGameStarted ? "" : " none"

  return (
    <div className={indicatorPanelClassName + none}>

        <div className="indicator-wrapper">
          {/* <img className="sideMenu-img score-img mb-2" src="./assets/images/score.ico" alt="score"/> */}
          {/* <h5 className="indicator-title">Score</h5> */}
          <div className="score-wrapper">
            <p className={fontSize}>{score}</p>
            {currentSum? <p className="indicator-add"> + {currentSum}</p> : <p></p>}
          </div>
        </div>


        <div className="indicator-wrapper">
          {/* <img className="sideMenu-img timer-img mb-1" src="./assets/images/timer.ico" alt="timer"/> */}
          <p className={fontSize}>00:00</p>
        </div>

    </div>
  );
};