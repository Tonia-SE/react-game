import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/rootReducer';
import { useHistory } from 'react-router-dom';
import { getNextDifficulty, getNextLang, getNextTheme } from '../../../store/actions';
import { RESTART_GAME, SELECT_LANGUAGE, SELECT_THEME, SET_GAME_SIZE, START_GAME } from '../../../store/actionTypes';
import { Footer } from '../../Footer/Footer';
import { NavBar } from '../../NavBar/NavBar';
import { btnSoundsPlayer, musicPlayer } from '../../../index';

export const HowToPlayPage: React.FC = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const appClassName = isFullScreen ? 'app-max' : 'app';
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const history = useHistory();
  let rootDiv: HTMLElement = null;
  musicPlayer.volume = musicVolume;

  useEffect(() => {
    getI18n().changeLanguage(language);
  }, [language]);

  useEffect(() => {
    rootDiv.focus();
  });

  function handleKeyPress(keyEvent: React.KeyboardEvent) {
    console.log(keyEvent.key);
    if (keyEvent.ctrlKey && keyEvent.key === 'm') {
      history.push('/');
    }
    if (keyEvent.ctrlKey && keyEvent.key === 'b') {
      history.push('/best_results');
      btnSoundsPlayer.play();
    }
    if (keyEvent.ctrlKey && keyEvent.key === 'i') {
      history.push('/settings');
      btnSoundsPlayer.play();
    }
    if (keyEvent.ctrlKey && keyEvent.key === '8') {
      keyEvent.preventDefault();
      dispatch({ type: SET_GAME_SIZE, gameSize: getNextDifficulty(gameSize) });
      dispatch({ type: RESTART_GAME });
      dispatch({ type: START_GAME });
      btnSoundsPlayer.play();
    }
    if (keyEvent.ctrlKey && keyEvent.key === '9') {
      keyEvent.preventDefault();
      dispatch({ type: SELECT_THEME, theme: getNextTheme(theme) });
      btnSoundsPlayer.play();
    }
    if (keyEvent.ctrlKey && keyEvent.key === '0') {
      keyEvent.preventDefault();
      dispatch({ type: SELECT_LANGUAGE, language: getNextLang(language) });
      btnSoundsPlayer.play();
    }
  }

  return (
    <div
      className={`${appClassName} bg-light-${theme} fc-${theme}`}
      tabIndex={1}
      onKeyDown={handleKeyPress}
      ref={(c: HTMLElement) => {
        rootDiv = c;
      }}>
      <NavBar />
      <div className="page-wrapper">
        <p className="page-text">
          <b className="mr-2">{t('how_to_play_page_text_part_1')}</b>
          {t('how_to_play_page_text_part_2')}
          <img className="text-img ml-2" src={`./assets/images/arrow_left_${theme}.ico`} alt="arrow left" />
          <img className="text-img" src={`./assets/images/arrow_up_${theme}.ico`} alt="arrow up" />
          <img className="text-img" src={`./assets/images/arrow_down_${theme}.ico`} alt="arrow down" />
          <img className="text-img mr-2" src={`./assets/images/arrow_right_${theme}.ico`} alt="arrow right" />
          {t('how_to_play_page_text_part_3')}
          <b className="ml-1 mr-1">2048</b>
          {t('how_to_play_page_text_part_5')}
          <br />
          {t('how_to_play_page_text_part_6')}
          <b className="mx-2">{t('how_to_play_page_text_part_7')}</b>
          <br />
          <b className="mr-2">ctrl + b:</b>
          {t('how_to_play_page_text_ctrl_b')},<br />
          <b className="mr-2">ctrl + h:</b>
          {t('how_to_play_page_text_ctrl_h')},<br />
          <b className="mr-2">ctrl + i:</b>
          {t('how_to_play_page_text_ctrl_i')},<br />
          <b className="mr-2">ctrl + m:</b>
          {t('how_to_play_page_text_ctrl_m')},<br />
          <b className="mr-2">ctrl + q:</b>
          {t('how_to_play_page_text_ctrl_q')},<br />
          <b className="mr-2">ctrl + 0:</b>
          {t('how_to_play_page_text_ctrl_0')},<br />
          <b className="mr-2">ctrl + 8:</b>
          {t('how_to_play_page_text_ctrl_8')},<br />
          <b className="mr-2">ctrl + 9:</b>
          {t('how_to_play_page_text_ctrl_9')}.<br />
          {t('how_to_play_page_text_part_8')}
        </p>
      </div>
      <Footer />
    </div>
  );
};
