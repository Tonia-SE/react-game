import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from '../Cell/Cell';
import { IndicatorPanel } from '../Indicators/IndicatorPanel';
import { LeftSideMenu } from '../SideMenu/LeftSideMenu';
import { ApplicationState } from '../../store/rootReducer';
import { Button } from 'react-bootstrap';
import { START_GAME, UPDATE_GAME_FIELD } from '../../store/actionTypes';
import { RightSideMenu } from '../SideMenu/RightSideMenu';
import { btnSoundsPlayer } from '../../index'

export const Field: React.FC = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const field = useSelector((state: ApplicationState) => state.game.field);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);
  const fieldClassName = isFullScreen ? "field-max": "field";
  const startBtnClassName = `btn-fc-${theme}`;
  btnSoundsPlayer.volume = soundsVolume;

  if(!isGameStarted) {
    return (
      <div className="game-wrapper">
        <IndicatorPanel />
        <div className="field-wrapper">
        <LeftSideMenu />
        <div className={`${fieldClassName} bg-dark-${theme} border-color-${theme}`}>
          <div className="start-game">
            <Button className={`start-game-btn-${theme}`} onClick={() => {
                dispatch({type: START_GAME })
                btnSoundsPlayer.play();
              }}>
              START GAME
            </Button>
          </div>
        </div>
        <RightSideMenu/>
        </div>
      </div>
    );
  } else{
    return (
      <div className="game-wrapper" >
        <IndicatorPanel />
        <div className="field-wrapper">
        <LeftSideMenu />
        <div className={`${fieldClassName} border-color-${theme}`} >
          {field.map((row: Array<number>) => {
            return row.map((value: number) => {
              return <Cell value={value} key={Math.random()*1000}/>
            })
          })}
        </div>
        <RightSideMenu/>
        </div>
      </div>
    );
  }
};
