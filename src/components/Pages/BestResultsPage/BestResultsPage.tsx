import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Footer } from '../../Footer/Footer'
import { NavBar } from '../../NavBar/NavBar';
import { ApplicationState } from '../../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { musicPlayer } from '../../../index';
import { getI18n, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { btnSoundsPlayer } from '../../../index'
import { getNextDifficulty, getNextLang, getNextTheme } from '../../../store/actions';
import { RESTART_GAME, SELECT_LANGUAGE, SELECT_THEME, SET_GAME_SIZE, START_GAME } from '../../../store/actionTypes';

export const BestResultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const appClassName = isFullScreen ? "app-max": "app";
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language)
  const history = useHistory();
  let rootDiv: HTMLElement = null

  musicPlayer.volume = musicVolume;

  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])

  useEffect(() => {
    rootDiv.focus();
  })

  function handleKeyPress(keyEvent: React.KeyboardEvent) {
    if (keyEvent.ctrlKey && keyEvent.key === 'm')  {
      history.push('/')       
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
  }


  return (
    <div className={`${appClassName} bg-light-${theme} fc-${theme}`} tabIndex={1} onKeyDown={handleKeyPress} ref={(c:HTMLElement) => {rootDiv = c}}>
      <NavBar />
      <div className="best-results page mt-3">
      <h3>
        <b>
          {t("best_results_page_table_title")}
        </b>
      </h3>
        <div className="table-wrapper">
          <Table className={`mt-3 fc-${theme} hover`}>
            <thead className="thead">
              <tr>
                <th></th>
                <th>{t("best_results_page_table_second_column")}</th>
                <th>{t("best_results_page_table_third_column")}</th>
                <th>{t("best_results_page_table_fourth_column")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};
