import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/rootReducer';
import { Footer } from '../../Footer/Footer'
import { NavBar } from '../../NavBar/NavBar';
import { musicPlayer } from '../../../index';


export const HowToPlayPage: React.FC = () => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const appClassName = isFullScreen ? "app-max": "app";
  const musicVolume = useSelector((state: ApplicationState) => state.sounds.musicVolume);
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language)

  musicPlayer.volume = musicVolume;

  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])

  return (
    <div className={`${appClassName} bg-light-${theme} fc-${theme}`}>
      <NavBar />
        <div className="page-wrapper">
  <p className="page-text"><b className="mr-2">{t("how_to_play_page_text_part_1")}</b>{t("how_to_play_page_text_part_2")} 
            <img className="text-img ml-2" src={`./assets/images/arrow_left_${theme}.ico`} alt="arrow left"/>
            <img className="text-img" src={`./assets/images/arrow_up_${theme}.ico`} alt="arrow up"/>
            <img className="text-img" src={`./assets/images/arrow_down_${theme}.ico`} alt="arrow down"/>
            <img className="text-img mr-2" src={`./assets/images/arrow_right_${theme}.ico`} alt="arrow right"/>
            {t("how_to_play_page_text_part_3")}<b className="ml-1 mr-1">2048</b>{t("how_to_play_page_text_part_5")}
          </p>
        </div>
      <Footer />
    </div>
  );
};
