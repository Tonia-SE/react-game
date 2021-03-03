import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getI18n, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/rootReducer';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RESTART_GAME, START_GAME } from '../../store/actionTypes';
import { buttonSoundsPlayer as buttonSoundsPlayer } from '../../index';

export const LeftSideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);
  const menuImgClassName = isFullScreen ? 'menu-img-max' : 'menu-img';
  const menuWrapperClassName = isFullScreen ? 'side-menu-wrapper-max' : 'side-menu-wrapper';
  const dispatchHandler = !isGameStarted ? { type: START_GAME } : { type: RESTART_GAME };
  buttonSoundsPlayer.volume = soundsVolume;

  useEffect(() => {
    getI18n().changeLanguage(language);
  }, [language]);

  return (
    <div className={menuWrapperClassName}>
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip className="display-none" id="tooltip-disabled">
            {t('left_side_menu_tooltip_play_start')}
          </Tooltip>
        }>
        <Link to="#">
          <img
            className={menuImgClassName}
            src={`./assets/images/start_game_${theme}.ico`}
            alt="game"
            onClick={() => {
              dispatch(dispatchHandler);
              buttonSoundsPlayer.play();
            }}
          />
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip className="display-none" id="tooltip-disabled">
            {t('left_side_menu_tooltip_autoplay')}
          </Tooltip>
        }>
        <Link to="/autoplay">
          <img
            className={menuImgClassName}
            src={`./assets/images/autoplay_${theme}.ico`}
            alt="autoplay"
            onClick={() => {
              buttonSoundsPlayer.play();
            }}
          />
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip className="display-none" id="tooltip-disabled">
            {t('left_side_menu_tooltip_how_to_play_first_line')}
            <br />
            {t('left_side_menu_tooltip_how_to_play_second_line')}
          </Tooltip>
        }>
        <Link to="/how_to_play">
          <img
            className={`${menuImgClassName} rotate`}
            src={`./assets/images/instructions_${theme}.ico`}
            alt="instructions"
            onClick={() => {
              buttonSoundsPlayer.play();
            }}
          />
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip className="display-none" id="tooltip-disabled">
            {t('left_side_menu_tooltip_settings')}
          </Tooltip>
        }>
        <Link to="/settings">
          <img
            className={`${menuImgClassName} rotate`}
            src={`./assets/images/settings_${theme}.ico`}
            alt="settings"
            onClick={() => {
              buttonSoundsPlayer.play();
            }}
          />
        </Link>
      </OverlayTrigger>
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip className="display-none" id="tooltip-disabled">
            {t('left_side_menu_tooltip_best_results_first_line')}
            <br />
            {t('left_side_menu_tooltip_best_results_second_line')}
          </Tooltip>
        }>
        <Link to="/best_results">
          <img
            className={menuImgClassName}
            src={`./assets/images/winners_${theme}.ico`}
            alt="winners"
            onClick={() => {
              buttonSoundsPlayer.play();
            }}
          />
        </Link>
      </OverlayTrigger>
    </div>
  );
};
