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
import { handleMove } from './store/actions';
import { useEffect } from 'react';
import { musicPlayer } from './index';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const field = useSelector((state: ApplicationState) => state.game.field);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleCloseLoginForm = () => setShowLoginForm(false);
  const handleShowLoginForm = () => setShowLoginForm(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const handleCloseSignUpForm = () => setShowSignUpForm(false);
  const handleShowSignUpForm = () => setShowSignUpForm(true);
  const appClassName = isFullScreen ? "app-max": "app";
  let rootDiv: HTMLElement = null
  let cellSoundsPlayer:HTMLAudioElement = new Audio("./assets/sounds/cell_sound.mp3")

  useEffect(() => {
    rootDiv.focus();
    if (musicVolume === 0) {
      console.log(musicVolume);
      console.log(musicPlayer);
      musicPlayer.autoplay = false;
      musicPlayer.loop = false;
      musicPlayer.pause;
      musicPlayer.volume = musicVolume;
    } else {
      console.log(musicVolume);
      console.log(musicPlayer);
      musicPlayer.autoplay = true;
      musicPlayer.loop = true;
      musicPlayer.volume = musicVolume;
    }
  })

  useEffect(() => {

  }, [])

  

  cellSoundsPlayer.volume = soundsVolume;

  function handleKeyPress(keyEvent: React.KeyboardEvent) {
    const arrowKeyEvents = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (arrowKeyEvents.indexOf(keyEvent.key) !== -1) {
      dispatch(handleMove(field, keyEvent.key))      
      cellSoundsPlayer.play();
    }
  }  
  
  return (
    <div className={`${appClassName} bg-light-${theme} fc-${theme}`}  tabIndex={1} onKeyDown={handleKeyPress} ref={(c:HTMLElement) => {rootDiv = c}}>
      <NavBar handleShowLoginForm={handleShowLoginForm} handleShowSignUp={handleShowSignUpForm}/>
      <SignUpForm show={showSignUpForm} onHide={handleCloseSignUpForm}/>
      <LoginForm show={showLoginForm} onHide={handleCloseLoginForm}  />
      <Field />
      <Footer />
    </div>
  );
};
