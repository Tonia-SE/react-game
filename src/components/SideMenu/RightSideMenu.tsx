import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/rootReducer';
import { RESTART_GAME, START_GAME } from '../../store/actionTypes';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { handleMove } from '../../store/actions'


export const RightSideMenu: React.FC = () => {
  const dispatch = useDispatch();
  //const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const isBtnsVisible = useSelector((state: ApplicationState) => state.settings.isGameBtnsVisible);
  const field = useSelector((state: ApplicationState) => state.game.field);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const arrowClassName = isFullScreen ? "arrow-max": "arrow";
  const menuWrapperClassName = isFullScreen ? "side-menu-wrapper-max": "side-menu-wrapper";
  const visibleClassName = isBtnsVisible ? "" : "none"
  //const playBtnImgSrc = !isGameStarted ? "./assets/images/start_game.ico" : "./assets/images/restart_game.ico";
  // const tooltipText = isGameStarted ? "restart game" : "start game";

  return (
  <div className={`${menuWrapperClassName} ${visibleClassName}`}> 
    <img className={`${arrowClassName}`} src={`./assets/images/arrow_left_${theme}.ico`} alt="arrow left" onClick={() => {dispatch(handleMove(field, 'ArrowLeft'))}}/>
    <img className={`${arrowClassName}`} src={`./assets/images/arrow_up_${theme}.ico`} alt="arrow up" onClick={() => {dispatch(handleMove(field, 'ArrowUp'))}}/>
    <img className={`${arrowClassName}`} src={`./assets/images/arrow_down_${theme}.ico`} alt="arrow down" onClick={() => {dispatch(handleMove(field, 'ArrowDown'))}}/>
    <img className={`${arrowClassName}`} src={`./assets/images/arrow_right_${theme}.ico`} alt="arrow right" onClick={() => {dispatch(handleMove(field, 'ArrowRight'))}}/>
  </div>
  );
};