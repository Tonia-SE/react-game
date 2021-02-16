import React from 'react';

export const Score: React.FC = () => {
  return (
    <div className="score-wrapper">
      <div className="row">
        <div className="wrapper-btn">
          <button className="my-btn">
            <img className="my-img" src="./assets/images/instructions.ico" alt="how to play" />
          </button>
          <button className="my-btn">
            <div className="score mr-3 mt-3">
              <h5 className="score-title">Score</h5>
              <div className="wrapper">
                <p className="score-main">100</p>
                <p className="score-add mt-1"> + 5</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
