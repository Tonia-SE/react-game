import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Footer } from '../../Footer/Footer'
import { NavBar } from '../../NavBar/NavBar';
import { ApplicationState } from '../../../store/rootReducer';
import { useSelector } from 'react-redux';
import { musicPlayer } from '../../../index';
import { getI18n, useTranslation } from 'react-i18next';

export const BestResultsPage: React.FC = () => {
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
      <div className="best-results page mt-3">
  <h3><b>{t("best_results_page_table_title")}</b></h3>
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
