import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from '../Cell/Cell';
import { IndicatorPanel } from '../Indicators/IndicatorPanel';
import { SideMenu } from '../SideMenu/SideMenu';
import { ApplicationState } from '../../store/rootReducer';
import { Button } from 'react-bootstrap';
import { START_GAME, UPDATE_GAME_FIELD } from '../../store/actionTypes';
import { handleMove } from '../../store/actions';

export const Field: React.FC = () => {
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const field = useSelector((state: ApplicationState) => state.game.field);
  const fieldClassName = isFullScreen ? "field-max": "field";
  const dispatch = useDispatch();

  if(!isGameStarted) {
    return (
      <div className="game-wrapper">
        <IndicatorPanel />
        <div className="field-wrapper">
        <div className={`${fieldClassName} bg-dark`}>
          <div className="start-game">
            <Button className="start-game-btn" onClick={() => {dispatch({type: START_GAME, isGameStarted: true})
                                                              dispatch({type: UPDATE_GAME_FIELD})}}>
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
        <div className={fieldClassName}>
          {field.map((row: Array<number>) => {
            return row.map((value: number) => {
              return <Cell value={value}/>
            })
          })}
        </div>
        <SideMenu />
        </div>
      </div>
    );
  }
};
