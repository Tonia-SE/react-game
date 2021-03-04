import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getI18n, useTranslation } from 'react-i18next';
import { ApplicationState } from '../../store/rootReducer';
import { Button } from 'react-bootstrap';
import { START_GAME } from '../../store/actionTypes';
import { RightSideMenu } from '../SideMenu/RightSideMenu';
import { buttonSoundsPlayer as buttonSoundsPlayer } from '../../index';
import { Cell } from '../Cell/Cell';
import { IndicatorPanel } from '../Indicators/IndicatorPanel';
import { LeftSideMenu } from '../SideMenu/LeftSideMenu';

export const Field: React.FC = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const field = useSelector((state: ApplicationState) => state.game.field);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);
  const fieldClassName = isFullScreen ? 'field-max' : 'field';
  buttonSoundsPlayer.volume = soundsVolume;
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);

  useEffect(() => {
    getI18n().changeLanguage(language);
  }, [language]);

  return !isGameStarted ? (
    <div className="game-wrapper">
      <IndicatorPanel />
      <div className="field-wrapper">
        <LeftSideMenu />
        <div className={`${fieldClassName} bg-dark-${theme} border-color-${theme}`}>
          <div className="start-game">
            <Button
              className={`start-game-btn-${theme}`}
              onClick={() => {
                dispatch({ type: START_GAME });
                buttonSoundsPlayer.play();
              }}>
              {t('start_game')}
            </Button>
          </div>
        </div>
        <RightSideMenu />
      </div>
    </div>
  ) : (
    <div className="game-wrapper">
      <IndicatorPanel />
      <div className="field-wrapper">
        <LeftSideMenu />
        <div className={`${fieldClassName} border-color-${theme}`}>
          {field.map((row: Array<number>) => {
            return row.map((value: number) => {
              return <Cell value={value} key={Math.random() * 1000} />;
            });
          })}
        </div>
        <RightSideMenu />
      </div>
    </div>
  );
};
