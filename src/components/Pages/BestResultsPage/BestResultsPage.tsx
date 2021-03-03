import React, { useEffect } from 'react';
import { ApplicationState } from '../../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getI18n, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getNextDifficulty, getNextLang, getNextTheme } from '../../../store/actions';
import { RESTART_GAME, SELECT_LANGUAGE, SELECT_THEME, SET_GAME_SIZE, START_GAME } from '../../../store/actionTypes';
import { getGameResults } from '../../../store/bestResultsReducer';
import { buttonSoundsPlayer as buttonSoundsPlayer, musicPlayer } from '../../../index';
import { Footer } from '../../Footer/Footer';
import { NavBar } from '../../NavBar/NavBar';

export const BestResultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const appClassName = isFullScreen ? 'app-max' : 'app';
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const history = useHistory();
  const results = useSelector((state: ApplicationState) => state.bestResults.results);
  let rootDiv: HTMLElement;
  musicPlayer.volume = musicVolume;

  useEffect(() => {
    getI18n().changeLanguage(language);
  }, [language]);

  useEffect(() => {
    rootDiv.focus();
  });

  useEffect(() => {
    dispatch(getGameResults());
  }, []);

  function handleKeyPress(keyEvent: React.KeyboardEvent) {
    if (keyEvent.ctrlKey && keyEvent.key === 'm') {
      history.push('/');
    }
    if (keyEvent.ctrlKey && keyEvent.key === 'i') {
      history.push('/settings');
      buttonSoundsPlayer.play();
    }
    if (keyEvent.ctrlKey && keyEvent.key === 'h') {
      keyEvent.preventDefault();
      history.push('/how_to_play');
      buttonSoundsPlayer.play();
    }
    if (keyEvent.ctrlKey && keyEvent.key === '8') {
      keyEvent.preventDefault();
      dispatch({ type: SET_GAME_SIZE, gameSize: getNextDifficulty(gameSize) });
      dispatch({ type: RESTART_GAME });
      dispatch({ type: START_GAME });
      buttonSoundsPlayer.play();
    }
    if (keyEvent.ctrlKey && keyEvent.key === '9') {
      keyEvent.preventDefault();
      dispatch({ type: SELECT_THEME, theme: getNextTheme(theme) });
      buttonSoundsPlayer.play();
    }
    if (keyEvent.ctrlKey && keyEvent.key === '0') {
      keyEvent.preventDefault();
      dispatch({ type: SELECT_LANGUAGE, language: getNextLang(language) });
      buttonSoundsPlayer.play();
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
      <div className="best-results page mt-3">
        <h3 className="best-results-page-title">
          <b>{t('best_results_page_table_title')}</b>
        </h3>
        {results.length === 0 ? (
          <div>{t('best_results_page_no_results')}</div>
        ) : (
          <div className="table-wrapper">
            <Table className={`mt-3 fc-${theme} hover`}>
              <thead className="thead">
                <tr>
                  <th></th>
                  <th>{t('best_results_page_table_second_column')}</th>
                  <th>{t('best_results_page_table_third_column')}</th>
                  <th>{t('best_results_page_table_fourth_column')}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => {
                  const minutes = result.minutes < 10 ? `0${result.minutes}` : `${result.minutes}`;
                  const seconds = result.seconds < 10 ? `0${result.seconds}` : `${result.seconds}`;
                  return (
                    <tr className="tr-hover" key={Math.random() * 1000}>
                      <td>{index + 1}</td>
                      <td>{result.user}</td>
                      <td>{result.score}</td>
                      <td>{`${minutes}:${seconds}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
