import React from 'react';
import { NavBar } from '../../NavBar/NavBar';
import { Footer } from '../../Footer/Footer'
import { Card, Form, ListGroup } from 'react-bootstrap';
import { ApplicationState } from '../../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { btnSoundsPlayer, musicPlayer } from '../../../index';
import { RESTART_GAME, SELECT_LANGUAGE, SELECT_THEME,
          SET_GAME_SIZE, SET_MUSIC_VOLUME, 
          SET_SOUNDS_VOLUME } from '../../../store/actionTypes';

export const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume)
  const soundsDefaultVolumeLevel = soundsVolume * 100;
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const musicDefaultVolumeLevel =  musicVolume * 100;
  let soundsVolumeControl:HTMLInputElement = null
  let musicVolumeControl:HTMLInputElement = null

  let soundOnImgClassName = '';
  let soundOffImgClassName = '';
  let musicOnImgClassName = '';
  let musicOffImgClassName = ''
  switch(soundsDefaultVolumeLevel){
    case(100): soundOnImgClassName = 'off-img'
                soundOffImgClassName = 'on-img'
      break;
    case(0): soundOnImgClassName = 'on-img'
                soundOffImgClassName = 'off-img'
      break;
    default: break;
  }
  switch(musicDefaultVolumeLevel){
    case(100): musicOnImgClassName = 'off-img'
                musicOffImgClassName = 'on-img'
      break;
    case(0): musicOnImgClassName = 'on-img'
              musicOffImgClassName = 'off-img'
      break;
    default: break;
  }
  btnSoundsPlayer.volume = soundsVolume;
  
  musicPlayer.volume = musicVolume;
  
  const appClassName = isFullScreen ? "app-max": "app";
  return (
    <div className={`${appClassName} bg-light-${theme} fc-${theme}`}>
      <NavBar />
      <div className="settings-page-wrapper">
        <div className="lang-colors-controls-wrapper">
        <Card className="my-card m-2" style={{ width: '30%' }}>
          <Card.Header>Difficulty</Card.Header>
          <ListGroup variant="flush"> 
            <ListGroup.Item>
              <p>4 x 4</p>
            <div className="input-wrapper" onChange={() => {
                dispatch({type: SET_GAME_SIZE, gameSize: 4})
                dispatch({type: RESTART_GAME})
                btnSoundsPlayer.play()
              }}>
              <input className="input-radio" type="radio" id="4" value="4" name="difficulty" defaultChecked={gameSize === 4}/>
            </div>  
            </ListGroup.Item>
            <ListGroup.Item>
              <p>5 x 5</p>
            <div className="input-wrapper" onChange={() => {
                dispatch({type: SET_GAME_SIZE, gameSize: 5})
                dispatch({type: RESTART_GAME})
                btnSoundsPlayer.play()
              }}>
              <input className="input-radio" type="radio" id="5" value="5" name="difficulty" defaultChecked={gameSize === 5}/>
            </div> 
            </ListGroup.Item>
            <ListGroup.Item>
              <p>6 x 6</p>
            <div className="input-wrapper" onChange={() => {
                dispatch({type: SET_GAME_SIZE, gameSize: 6})
                dispatch({type: RESTART_GAME})
                btnSoundsPlayer.play()
              }}>
              <input className="input-radio" type="radio" id="6" value="6" name="difficulty" defaultChecked={gameSize === 6}/>
            </div> 
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="my-card m-2" style={{ width: '30%' }}>
          <Card.Header>Theme</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>Shadow</p>
              <div className="input-wrapper" onChange={() => {
                  dispatch({type: SELECT_THEME, theme: 'shadow'})
                  btnSoundsPlayer.play()
                }}>
                <input className="input-radio" type="radio" id="shadow" value="shadow" name="theme" defaultChecked={theme === 'shadow'}/>
              </div> 
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Sweet</p>
              <div className="input-wrapper" onChange={() => {
                  dispatch({type: SELECT_THEME, theme: 'sweet'})
                  btnSoundsPlayer.play()
                }}>
                <input className="input-radio" type="radio" id="sweet" value="sweet" name="theme" defaultChecked={theme === 'sweet'}/>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Deep</p>
              <div className="input-wrapper" onChange={() => {
                  dispatch({type: SELECT_THEME, theme: 'deep'})
                  btnSoundsPlayer.play()
                }}>
                <input className="input-radio" type="radio" id="deep" value="deep" name="theme" defaultChecked={theme === 'deep'}/>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="my-card m-2" style={{ width: '30%' }}>
          <Card.Header>Language</Card.Header>
          <ListGroup variant="flush"> 
            <ListGroup.Item>
              <p>English</p>
              <div className="input-wrapper" onChange={() => {
                  dispatch({type: SELECT_LANGUAGE, language: 'English'})
                  btnSoundsPlayer.play()
                }}>
                <input className="input-radio" type="radio" id="english" value="english" name="language" defaultChecked={language === 'English'}/>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Russian</p>
              <div className="input-wrapper" onChange={() => {
                  dispatch({type: SELECT_LANGUAGE, language: 'Russian'})
                  btnSoundsPlayer.play()
                }}>
                <input className="input-radio" type="radio" id="russian" value="russian" name="language" defaultChecked={language === 'Russian'}/>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Chinese</p>
              <div className="input-wrapper" onChange={() => {
                  dispatch({type: SELECT_LANGUAGE, language: 'Chinese'})
                  btnSoundsPlayer.play()
                }}>
                <input className="input-radio" type="radio" id="chinese" value="chinese" name="language" defaultChecked={language === 'Chinese'}/>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        </div>
        <div className="sound-controls-wrapper">
          <Card className="my-card text-center m-2">
            <Card.Body className="my-card-body">
              <Card.Title className="my-card-title">Sounds</Card.Title>
              <Form>
                <Form.Group className="range-group" controlId="formBasicRangeSounds">
                  <img  className={`control-img mr-3 ml-1 ${soundOnImgClassName}`} src="./assets/images/sounds_off.ico" alt="sounds off" onClick={()=> {
                    if (soundsVolumeControl !== null) {
                      soundsVolumeControl.value = '0'
                      dispatch({ type: SET_SOUNDS_VOLUME, soundsVolume: 0 })
                    }
                  }}/>
                    <Form.Control ref={(element:HTMLInputElement) => {soundsVolumeControl = element}} type="range" defaultValue={soundsDefaultVolumeLevel} onChange={(event) => { 
                        dispatch({ type: SET_SOUNDS_VOLUME, soundsVolume: +event.currentTarget.value })
                      }}/>
                  <img className={`control-img ml-3 mr-1 ${soundOffImgClassName}`} src="./assets/images/sounds_max.ico" alt="sounds max" onClick={()=> {
                    if (soundsVolumeControl !== null) {
                      soundsVolumeControl.value = '100'
                      dispatch({ type: SET_SOUNDS_VOLUME, soundsVolume: 100 })
                    }
                  }}/>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          </div>
          <div className="sound-controls-wrapper">
          <Card className="my-card text-center m-2">
            <Card.Body className="my-card-body">
              <Card.Title className="my-card-title">Music</Card.Title>
              <Form>
                <Form.Group className="range-group">
                  <img className={`control-img mr-3 ml-1 ${musicOnImgClassName}`} src="./assets/images/music_off.ico" alt="music off" onClick={()=> {
                    if (musicVolumeControl !== null) {
                      musicVolumeControl.value = '0'                      
                      dispatch({ type: SET_MUSIC_VOLUME, musicVolume: 0})
                    }
                  }}/>
                    <Form.Control ref={(element:HTMLInputElement) => {musicVolumeControl = element}} type="range" defaultValue={musicDefaultVolumeLevel} 
                      onChange={(event) => {
                        dispatch({ type: SET_MUSIC_VOLUME, musicVolume: +event.currentTarget.value })
                        musicPlayer.volume = +event.currentTarget.value / 100;
                    }}/>
                  <img className={`control-img ml-3 mr-1 ${musicOffImgClassName}`} src="./assets/images/music_max.ico" alt="music max" onClick={()=> {
                    if (musicVolumeControl !== null) {
                      musicVolumeControl.value = '100'                      
                      dispatch({ type: SET_MUSIC_VOLUME, musicVolume: 100})
                    }
                  }}/>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>  
      <Footer />
    </div>
  );
};


