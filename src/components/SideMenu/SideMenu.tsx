import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/rootReducer';
import { RESTART_GAME, START_GAME } from '../../store/actionTypes';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


export const SideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const menuImgClassName = isFullScreen ? "menu-img-max": "menu-img";
  const menuWrapperClassName = isFullScreen ? "side-menu-wrapper-max": "side-menu-wrapper";
  const playBtnImgSrc = !isGameStarted ? "./assets/images/start_game.ico" : "./assets/images/restart_game.ico";
  const tooltipText = isGameStarted ? "restart game" : "start game";

  return (
    <div className={menuWrapperClassName}>
      <OverlayTrigger placement="right" overlay={<Tooltip  id="tooltip-disabled">{tooltipText}</Tooltip>}>
        <Link to="#"><img className={menuImgClassName} src={playBtnImgSrc} alt="game" onClick={() => dispatch({type: RESTART_GAME})}/></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">autoplay</Tooltip>}>
        <Link to="/autoplay"><img className={menuImgClassName} src="./assets/images/autoplay.ico" alt="autoplay"/></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">how to play</Tooltip>}>
        <Link to="/how_to_play"><img className={`${menuImgClassName} rotate`} src="./assets/images/instructions2.ico" alt="instructions"/></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">settings</Tooltip>}>
        <Link to="/settings"><img className={`${menuImgClassName} rotate`} src="./assets/images/settings2.ico" alt="settings"/></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">best results</Tooltip>}>
        <Link to="/best_results"><img className={menuImgClassName} src="./assets/images/winners2.ico" alt="winners"/></Link>
      </OverlayTrigger>
    </div>
  );
};
{/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Tooltip!</Tooltip>}>
  <span className="d-inline-block">
    <Button disabled style={{ pointerEvents: 'none' }}>
      Disabled button
    </Button>
  </span>
</OverlayTrigger> */}