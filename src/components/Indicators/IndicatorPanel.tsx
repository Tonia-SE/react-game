import React from 'react';

export const IndicatorPanel: React.FC = () => {
  return (
    <div className="indicators-wrapper">

        <div className="indicator-wrapper mr-3">
          {/* <img className="sideMenu-img score-img mb-2" src="./assets/images/score.ico" alt="score"/> */}
          {/* <h5 className="indicator-title">Score</h5> */}
          <div className="score-wrapper">
            <p className="indicator-main">100</p>
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