import React, { useState } from 'react';
//import i18n from "i18next";
import { getI18n } from "react-i18next";
import './styles/index.scss';
import { NavBar } from './components/NavBar/NavBar';
import { Field } from './components/Field/Field';
import { SignUpForm } from './components/RegForms/SignUpForm';
import { LoginForm } from './components/RegForms/LoginForm';
import { IndicatorPanel } from './components/Indicators/IndicatorPanel';
import { Footer } from './components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from './store/rootReducer';
import { getNextDifficulty, getNextLang, getNextTheme, handleMove } from './store/actions';
import { useEffect } from 'react';
import { musicPlayer } from './index';
import { FailModal } from './components/Modal/FailModal';
import { WinModal } from './components/Modal/WinModal';
import { btnSoundsPlayer } from './index'
import { useHistory } from 'react-router-dom';
import { RESTART_GAME, SELECT_LANGUAGE, SELECT_THEME, SET_GAME_SIZE, START_GAME } from './store/actionTypes';
//import { translations } from './translations'

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  //const language = useSelector((state: ApplicationState) => state.settings.language);
  const field = useSelector((state: ApplicationState) => state.game.field);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const dispatchHandler = !isGameStarted ? {type: START_GAME}: {type: RESTART_GAME};

  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleCloseLoginForm = () => setShowLoginForm(false);
  const handleShowLoginForm = () => setShowLoginForm(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const handleCloseSignUpForm = () => setShowSignUpForm(false);
  const handleShowSignUpForm = () => setShowSignUpForm(true);

  const appClassName = isFullScreen ? "app-max": "app";
  let rootDiv: HTMLElement = null
  const cellSoundsPlayer:HTMLAudioElement = new Audio("./assets/sounds/cell_sound.mp3");
  const history = useHistory();

  useEffect(() => {
    rootDiv.focus();
    if (musicVolume === 0) {
      musicPlayer.autoplay = false;
      musicPlayer.loop = false;
      musicPlayer.pause;
      musicPlayer.volume = musicVolume;
    } else {
      musicPlayer.autoplay = true;
      musicPlayer.loop = true;
      musicPlayer.volume = musicVolume;
    }
  })

  cellSoundsPlayer.volume = soundsVolume;


  function handleKeyPress(keyEvent: React.KeyboardEvent) {
    const arrowKeyEvents = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (arrowKeyEvents.indexOf(keyEvent.key) !== -1) {
      dispatch(handleMove(field, keyEvent.key, cellSoundsPlayer))      
    }

    if (keyEvent.ctrlKey && keyEvent.key === 'b')  {
      history.push("/best_results");
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === 'i')  {
      history.push("/settings");
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === 'h')  {
      keyEvent.preventDefault();
      history.push("/how_to_play");
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === '8')  {
      keyEvent.preventDefault();
      dispatch({type: SET_GAME_SIZE, gameSize: getNextDifficulty(gameSize)})
      dispatch({type: RESTART_GAME})
      dispatch({type: START_GAME})
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === '9')  {
      keyEvent.preventDefault()
      dispatch({type: SELECT_THEME, theme: getNextTheme(theme)})
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === '0')  {
      keyEvent.preventDefault()
      dispatch({type: SELECT_LANGUAGE, language: getNextLang(language)})
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === 'q')  {
      dispatch(dispatchHandler)
      btnSoundsPlayer.play();
    }
  }  
  
  return (
    <div className={`${appClassName} bg-light-${theme} fc-${theme}`}  tabIndex={1} onKeyDown={handleKeyPress} ref={(c:HTMLElement) => {rootDiv = c}}>
      <NavBar handleShowLoginForm={handleShowLoginForm} handleShowSignUp={handleShowSignUpForm}/>
      <SignUpForm show={showSignUpForm} onHide={handleCloseSignUpForm}/>
      <LoginForm show={showLoginForm} onHide={handleCloseLoginForm}/>
      <FailModal />
      <WinModal />
      <Field />
      <Footer />
    </div>
  );
};
