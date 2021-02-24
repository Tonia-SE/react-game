import React from 'react';
import { Table } from 'react-bootstrap';
import { Footer } from '../../Footer/Footer'
import { NavBar } from '../../NavBar/NavBar';
import { ApplicationState } from '../../../store/rootReducer';
import { useSelector } from 'react-redux';

export const BestResultsPage: React.FC = () => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const appClassName = isFullScreen ? "app-max": "app";
  return (
    <div className={`${appClassName} bg-light-${theme} fc-${theme}`}>
      <NavBar />
      <div className="best-results page mt-3">
        <h3><b>BEST RESULTS</b></h3>
        <div className="table-wrapper">
          <Table className={`mt-3 fc-${theme} hover`}>
            <thead className="thead">
              <tr>
                <th></th>
                <th>NICK</th>
                <th>SCORE</th>
                <th>TIME</th>
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
