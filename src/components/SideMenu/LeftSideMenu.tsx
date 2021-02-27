import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/rootReducer';
import { RESTART_GAME, START_GAME } from '../../store/actionTypes';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { btnSoundsPlayer } from '../../index'

export const LeftSideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme) 
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume) 
  const menuImgClassName = isFullScreen ? "menu-img-max": "menu-img";
  const menuWrapperClassName = isFullScreen ? "side-menu-wrapper-max": "side-menu-wrapper";
  const playBtnImgSrc = !isGameStarted ? `./assets/images/start_game_${theme}.ico` : `./assets/images/restart_game_${theme}.ico`;
  const dispatchHandler = !isGameStarted ? {type: START_GAME}: {type: RESTART_GAME};
  const tooltipText = isGameStarted ? "restart" : "start";
  btnSoundsPlayer.volume = soundsVolume;

  return (
    <div className={menuWrapperClassName}>
      <OverlayTrigger placement="left" overlay={<Tooltip className="display-none" id="tooltip-disabled">{tooltipText}</Tooltip>}>
        <Link to="#"><img className={menuImgClassName} src={playBtnImgSrc} alt="game" onClick={() => {
            dispatch(dispatchHandler)
            btnSoundsPlayer.play();
          }}/></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="left" overlay={<Tooltip className="display-none" id="tooltip-disabled">autoplay</Tooltip>}>
        <Link to="/autoplay"><img className={menuImgClassName} src={`./assets/images/autoplay_${theme}.ico`} alt="autoplay"
          onClick={
            () => {
              btnSoundsPlayer.play();
            }
          }/></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="left" overlay={<Tooltip className="display-none" id="tooltip-disabled">how to <br/>play</Tooltip>}>
        <Link to="/how_to_play"><img className={`${menuImgClassName} rotate`} src={`./assets/images/instructions_${theme}.ico`} alt="instructions" onClick={
            () => {
              btnSoundsPlayer.play();
            }
          }/></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="left" overlay={<Tooltip className="display-none" id="tooltip-disabled">settings</Tooltip>}>
        <Link to="/settings"><img className={`${menuImgClassName} rotate`} src={`./assets/images/settings_${theme}.ico`} alt="settings"
          onClick={
            () => {
              btnSoundsPlayer.play();
            }
          }/></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="left" overlay={<Tooltip className="display-none" id="tooltip-disabled">best  <br/>results</Tooltip>}>
        <Link to="/best_results"><img className={menuImgClassName} src={`./assets/images/winners_${theme}.ico`} alt="winners"
          onClick={
            () => {
              btnSoundsPlayer.play();
            }
          }/></Link>
      </OverlayTrigger>
    </div>
  );
};