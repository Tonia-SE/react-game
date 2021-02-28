import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { NavBar } from '../../NavBar/NavBar';
import { Footer } from '../../Footer/Footer'
import { Card, Form, ListGroup } from 'react-bootstrap';
import { ApplicationState } from '../../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { btnSoundsPlayer, musicPlayer } from '../../../index';
import { RESTART_GAME, SELECT_LANGUAGE, SELECT_THEME,
          SET_GAME_SIZE, SET_MUSIC_VOLUME, 
          SET_SOUNDS_VOLUME, 
          START_GAME} from '../../../store/actionTypes';
import { useHistory } from 'react-router-dom';
import { getNextDifficulty, getNextLang, getNextTheme } from '../../../store/actions';

export const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume)
  const soundsDefaultVolumeLevel = soundsVolume * 100;
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const musicDefaultVolumeLevel =  musicVolume * 100;
  let settingPageDiv: HTMLElement = null

  let soundsVolumeControl:HTMLInputElement = null
  let musicVolumeControl:HTMLInputElement = null
  let dificultyControl4:HTMLInputElement = null;
  let dificultyControl5:HTMLInputElement = null;
  let dificultyControl6:HTMLInputElement = null;
  let themeControlShadow:HTMLInputElement = null;
  let themeControlSweet:HTMLInputElement = null;
  let themeControlDeep:HTMLInputElement = null;
  let langControlEng:HTMLInputElement = null;
  let langControlRu:HTMLInputElement = null;
  let langControlFr:HTMLInputElement = null;

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

  const history = useHistory();

  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])

  useEffect(() => {
    settingPageDiv.focus();
  }, [])

  function handleKeyPress(keyEvent: React.KeyboardEvent) {
    if (keyEvent.ctrlKey && keyEvent.key === 'm')  {
      history.push('/') 
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === 'b')  {
      history.push("/best_results");
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === 'l')  {
      keyEvent.preventDefault();
      history.push("/how_to_play");
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === '8')  {
      keyEvent.preventDefault();
      const nextSize = getNextDifficulty(gameSize)
      dispatch({type: SET_GAME_SIZE, gameSize: nextSize})
      dispatch({type: RESTART_GAME})
      switch (nextSize) {
        case 4: 
          dificultyControl4.checked = true;
          break;
        case 5: 
          dificultyControl5.checked = true;
          break;
        case 6:
          dificultyControl6.checked = true;
          break;  
      }
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === '9')  {
      keyEvent.preventDefault();
      const nextTheme = getNextTheme(theme)
      dispatch({type: SELECT_THEME, theme: nextTheme})
      switch (nextTheme) {
        case 'sweet': 
          themeControlSweet.checked = true;
          break;
        case 'deep': 
        themeControlDeep.checked = true;
          break;
        case 'shadow':
          themeControlShadow.checked = true;
          break;  
      }
      btnSoundsPlayer.play();
    }

    if (keyEvent.ctrlKey && keyEvent.key === '0')  {
      keyEvent.preventDefault();
      const nextLang = getNextLang(language)
      dispatch({type: SELECT_LANGUAGE, language: nextLang})
      switch (nextLang) {
        case 'en': 
          langControlEng.checked = true;
          break;
        case 'ru': 
          langControlRu.checked = true;
          break;
        case 'fr':
          langControlFr.checked = true;
          break;  
      }
      btnSoundsPlayer.play();
    }
  }

  return (
    <div className={`${appClassName} bg-light-${theme} fc-${theme}`} tabIndex={1} onKeyDown={handleKeyPress} ref={(c:HTMLElement) => {settingPageDiv = c}}>
      <NavBar />
      <div className="settings-page-wrapper">
        <div className="lang-colors-controls-wrapper">
        <Card className="my-card m-2" style={{ width: '30%' }}>
          <Card.Header>{t("settings_page_difficulty")}</Card.Header>
          <ListGroup variant="flush"> 
            <ListGroup.Item onClick={() => {
              if (dificultyControl4 !== null) {
                dificultyControl4.checked = true
                dispatch({type: SET_GAME_SIZE, gameSize: 4})
                dispatch({type: RESTART_GAME})
                btnSoundsPlayer.play()
              }
            }}>
              <p>4 x 4</p>
              <input className="input-radio" type="radio" id="4" value="4" name="settings_page_difficulty" 
              defaultChecked={gameSize === 4} onChange={() =>{
                dispatch({type: SET_GAME_SIZE, gameSize: 4})
                dispatch({type: RESTART_GAME})
                btnSoundsPlayer.play()
              }}
              ref={(element:HTMLInputElement) => {dificultyControl4 = element}}/>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => {
              if (dificultyControl5 !== null) {
                dificultyControl5.checked = true
                dispatch({type: SET_GAME_SIZE, gameSize: 5})
                dispatch({type: RESTART_GAME})
                btnSoundsPlayer.play()
              }
            }}>
              <p>5 x 5</p>
              <input className="input-radio" type="radio" id="5" value="5" name="settings_page_difficulty" 
              defaultChecked={gameSize === 5} onChange={() =>{
                dispatch({type: SET_GAME_SIZE, gameSize: 5})
                dispatch({type: RESTART_GAME})
                btnSoundsPlayer.play()
              }}
              ref={(element:HTMLInputElement) => {dificultyControl5 = element}}/>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => {
              if (dificultyControl6 !== null) {
                dificultyControl6.checked = true
                dispatch({type: SET_GAME_SIZE, gameSize: 6})
                dispatch({type: RESTART_GAME})
                btnSoundsPlayer.play()
              }
            }}>
              <p>6 x 6</p>
              <input className="input-radio" type="radio" id="6" value="6" name="settings_page_difficulty" 
              defaultChecked={gameSize === 6} onChange={() =>{
                  dispatch({type: SET_GAME_SIZE, gameSize: 6})
                  dispatch({type: RESTART_GAME})
                  btnSoundsPlayer.play()
                }}
              ref={(element:HTMLInputElement) => {dificultyControl6 = element}}/>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="my-card m-2" style={{ width: '30%' }}>
          <Card.Header>{t("settings_page_theme")}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item onClick={() => {
              if (themeControlShadow !== null) {
                themeControlShadow.checked = true
                dispatch({type: SELECT_THEME, theme: 'shadow'})
                btnSoundsPlayer.play()
              }
            }}>
              <p>{t("settings_page_theme_shadow")}</p>
                <input className="input-radio" type="radio" id="shadow" value="shadow" name="settings_page_theme" 
                defaultChecked={theme === 'shadow'} onChange={() =>{
                  dispatch({type: SELECT_THEME, theme: 'shadow'})
                  btnSoundsPlayer.play()
                }} 
                ref={(element:HTMLInputElement) => {themeControlShadow = element}}/>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => {
              if (themeControlSweet !== null) {
                themeControlSweet.checked = true
                dispatch({type: SELECT_THEME, theme: 'sweet'})
                btnSoundsPlayer.play()
              }
            }}>
              <p>{t("settings_page_theme_sweet")}</p>
                <input className="input-radio" type="radio" id="sweet" value="sweet" name="settings_page_theme" 
                defaultChecked={theme === 'sweet'} onChange={() =>{
                  dispatch({type: SELECT_THEME, theme: 'sweet'})
                  btnSoundsPlayer.play()
                }}
                ref={(element:HTMLInputElement) => {themeControlSweet = element}}/>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => {
              if (themeControlDeep !== null) {
                themeControlDeep.checked = true
                dispatch({type: SELECT_THEME, theme: 'deep'})
                btnSoundsPlayer.play()
              }
            }}>
              <p>{t("settings_page_theme_deep")}</p>
                <input className="input-radio" type="radio" id="deep" value="deep" name="settings_page_theme"
                defaultChecked={theme === 'deep'} onChange={() =>{
                  dispatch({type: SELECT_THEME, theme: 'deep'})
                  btnSoundsPlayer.play()
                }}
                ref={(element:HTMLInputElement) => {themeControlDeep = element}}/>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="my-card m-2" style={{ width: '30%' }}>
          <Card.Header>{t("settings_page_language")}</Card.Header>
          <ListGroup variant="flush"> 
            <ListGroup.Item onClick={() => {
              if (langControlEng !== null) {
                langControlEng.checked = true
                dispatch({type: SELECT_LANGUAGE, language: 'en'})
                btnSoundsPlayer.play()
              }
            }}>
              <p>English</p>
                <input className="input-radio" type="radio" id="english" value="english" name="settings_page_language" 
                defaultChecked={language === 'en'} onChange={() =>{
                  dispatch({type: SELECT_LANGUAGE, language: 'en'})
                  btnSoundsPlayer.play()
                }}
                ref={(element:HTMLInputElement) => {langControlEng = element}}/>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => {
              if (langControlRu !== null) {
                langControlRu.checked = true
                dispatch({type: SELECT_LANGUAGE, language: 'ru'})
                btnSoundsPlayer.play()
              }
            }}>
              <p>Русский</p>
                <input className="input-radio" type="radio" id="russian" value="russian" name="settings_page_language" 
                defaultChecked={language === 'ru'} onChange={() =>{
                  dispatch({type: SELECT_LANGUAGE, language: 'ru'})
                  btnSoundsPlayer.play()
                }}
                ref={(element:HTMLInputElement) => {langControlRu = element}}/>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => {
              if (langControlFr !== null) {
                langControlFr.checked = true
                dispatch({type: SELECT_LANGUAGE, language: 'fr'})
                btnSoundsPlayer.play()
              }
            }}>
              <p>Français</p>
                <input className="input-radio" type="radio" id="chinese" value="chinese" name="settings_page_language" 
                defaultChecked={language === 'fr'} onChange={() =>{
                  dispatch({type: SELECT_LANGUAGE, language: 'fr'})
                  btnSoundsPlayer.play()
                }}
                ref={(element:HTMLInputElement) => {langControlFr = element}}/>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        </div>
        <div className="sound-controls-wrapper">
          <Card className="my-card text-center m-2">
            <Card.Body className="my-card-body">
              <Card.Title className="my-card-title">{t("settings_page_sounds")}</Card.Title>
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
              <Card.Title className="my-card-title">{t("settings_page_music")}</Card.Title>
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


