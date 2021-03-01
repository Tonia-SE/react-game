import React, { useState } from 'react';
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
import { RESET_FAILED_ATTEMPT, RESET_TIMER, RESTART_GAME, SAVE_GAME_TIME, SELECT_LANGUAGE, SELECT_THEME, SET_GAME_SIZE, START_GAME } from './store/actionTypes';
import { saveGameResult } from './store/bestResultsReducer';

//import { translations } from './translations'

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  //const language = useSelector((state: ApplicationState) => state.settings.language);
  const field = useSelector((state: ApplicationState) => state.game.field);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isLoggedIn = useSelector((state: ApplicationState) => state.auth.isLoggedIn);
  const isWin = useSelector((state: ApplicationState) => state.game.isWin);
  const isFail = useSelector((state: ApplicationState) => state.game.isFail);
  const score = useSelector((state: ApplicationState) => state.game.score);
  const seconds = useSelector((state: ApplicationState) => state.game.seconds);
  const minutes = useSelector((state: ApplicationState) => state.game.minutes);
  const userName = useSelector((state: ApplicationState) => state.auth.userName);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const dispatchHandler = !isGameStarted ? {type: START_GAME}: {type: RESTART_GAME};

  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleCloseLoginForm = () => setShowLoginForm(false);
  const handleShowLoginForm = () => {
    dispatch({type: RESET_FAILED_ATTEMPT});
    setShowLoginForm(true);
  };
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const handleCloseSignUpForm = () => setShowSignUpForm(false);
  const handleShowSignUpForm = () => {
    setShowSignUpForm(true);
    dispatch({type: RESET_FAILED_ATTEMPT});
  };

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

  useEffect(() => {
    if (isLoggedIn) {
      if (isWin || isFail) {
        saveGameResult(userName, score, seconds, minutes)
        dispatch({type: RESET_TIMER, resetTimer: true})
      }
    }
  }, [isWin, isFail])

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
