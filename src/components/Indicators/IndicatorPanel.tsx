import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { RESET_TIMER, SAVE_GAME_TIME } from '../../store/actionTypes';

export const IndicatorPanel: React.FC = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isWin = useSelector((state: ApplicationState) => state.game.isWin);
  const isFail = useSelector((state: ApplicationState) => state.game.isFail);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const score = useSelector((state: ApplicationState) => state.game.score);
  const points = useSelector((state: ApplicationState) => state.game.currentSum);
  const isTimerOn = useSelector((state: ApplicationState) => state.game.isTimerOn);
  const resetTimer = useSelector((state: ApplicationState) => state.game.resetTimer);
  const indicatorPanelClassName = isFullScreen ? 'indicators-wrapper-max' : 'indicators-wrapper';
  const fontSize = isFullScreen ? 'indicator-main-max' : 'indicator-main';
  const currentSum = isFullScreen ? 'current-sum-value-max' : 'current-sum-value';
  const none = isGameStarted ? '' : ' none';
  const initialSeconds = !localStorage.getItem('seconds') ? 0 : JSON.parse(localStorage.getItem('seconds'));
  const initialMinutes = !localStorage.getItem('minutes') ? 0 : JSON.parse(localStorage.getItem('minutes'));
  const [seconds, setSeconds] = useState(initialSeconds);
  const [minutes, setMinutes] = useState(initialMinutes);

  useEffect(() => {
    if (isWin || isFail) {
      dispatch({ type: SAVE_GAME_TIME, seconds: seconds, minutes: minutes });
    }
  }, [isWin, isFail]);

  useEffect(() => {
    if (resetTimer) {
      setSeconds(0);
      setMinutes(0);
      localStorage.setItem('seconds', JSON.stringify(0));
      localStorage.setItem('minutes', JSON.stringify(0));
      dispatch({ type: RESET_TIMER, resetTimer: false });
    }
  }, [resetTimer]);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (isTimerOn) {
      timer = setTimeout(() => {
        if (seconds === 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);
      localStorage.setItem('seconds', JSON.stringify(seconds));
      localStorage.setItem('minutes', JSON.stringify(minutes));
    }
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className={indicatorPanelClassName + none}>
      <div className="indicator-wrapper">
        <div className="score-wrapper">
          <p className={fontSize}>{score}</p>
          <p className={`${currentSum} ml-2`}>{`+ ${points}`}</p>
        </div>
      </div>
      <div className="indicator-wrapper">
        <p className={fontSize}>
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      </div>
    </div>
  );
};
