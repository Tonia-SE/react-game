import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

export const IndicatorPanel: React.FC = () => {
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const indicatorPanelClassName = isGameStarted ? "indicators-wrapper" : "indicators-wrapper none"

  return (
    <div className={indicatorPanelClassName}>

        <div className="indicator-wrapper mr-3">
          {/* <img className="sideMenu-img score-img mb-2" src="./assets/images/score.ico" alt="score"/> */}
          {/* <h5 className="indicator-title">Score</h5> */}
          <div className="score-wrapper">
            <p className="indicator-main mr-1">100</p>
            <p className="indicator-add mt-1"> + 5</p>
          </div>
        </div>


        <div className="indicator-wrapper mr-3">
          {/* <img className="sideMenu-img timer-img mb-1" src="./assets/images/timer.ico" alt="timer"/> */}
          <p className="indicator-main">00:00</p>
        </div>

    </div>
  );
};