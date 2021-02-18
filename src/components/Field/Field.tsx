import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from '../Cell/Cell';
import { IndicatorPanel } from '../Indicators/IndicatorPanel';
import { SideMenu } from '../SideMenu/SideMenu';
import { ApplicationState } from '../../store/rootReducer';
import { Button } from 'react-bootstrap';
import { START_GAME } from '../../store/actionTypes';

export const Field: React.FC = () => {
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const dispatch = useDispatch();

  if(!isGameStarted) {
    return (
      <div className="game-wrapper">
        <IndicatorPanel />
        <div className="field-wrapper">
        <div className="field">
          <div className="start-game">
            <Button className="start-game-btn" onClick={() => dispatch({type: START_GAME, isGameStarted: true})}>
              START GAME
            </Button>
          </div>
        </div>
        <SideMenu />
        </div>
      </div>
    );
  } else{
    return (
      <div className="game-wrapper">
        <IndicatorPanel />
        <div className="field-wrapper">
        <div className="field">
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </div>
        <SideMenu />
        </div>
      </div>
    );
  }
};
