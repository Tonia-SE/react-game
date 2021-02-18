import React from 'react';
import { NavBar } from '../../NavBar/NavBar';
import { Footer } from '../../Footer/Footer'
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import { ApplicationState } from '../../../store/rootReducer';
import { useSelector } from 'react-redux';

export const SettingsPage: React.FC = () => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const appClassName = isFullScreen ? "app-max": "app";
  return (
    <div className={appClassName}>
      <NavBar />
      <div className="settings-page-wrapper">
        <div className="lang-colors-controls-wrapper">
        <Card className="my-card m-3 mt-5" style={{ width: '18rem' }}>
          <Card.Header>Color themes</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Shadow
              <input type="radio" id="shadow" value="shadow"/>
            </ListGroup.Item>
            <ListGroup.Item>
              Sweet
              <input type="radio" id="sweet" value="sweet"/>
            </ListGroup.Item>
            <ListGroup.Item>
              Deep
              <input type="radio" id="deep" value="deep"/>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="my-card m-3 mt-5" style={{ width: '18rem' }}>
          <Card.Header>Languages</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              English
              <input type="radio" id="english" value="english"/>
            </ListGroup.Item>
            <ListGroup.Item>
              Russian
              <input type="radio" id="russian" value="russian"/>
            </ListGroup.Item>
            <ListGroup.Item>
              Chinese
              <input type="radio" id="chinese" value="chinese"/>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        </div>
        <div className="sound-controls-wrapper">
          <Card className="my-card text-center m-3">
            <Card.Body>
              <Card.Title>Sounds</Card.Title>
              <Card.Text>
              <Form>
                <Form.Group controlId="formBasicRange">
                  <img className="control-img mr-3" src="./assets/images/sounds_off.ico" alt="sounds off"/>
                    <Form.Control type="range" />
                  <img className="control-img ml-3" src="./assets/images/sounds_max.ico" alt="sounds max"/>
                </Form.Group>
              </Form>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-card text-center m-3">
            <Card.Body>
              <Card.Title>Music</Card.Title>
              <Card.Text>
              <Form>
                <Form.Group controlId="formBasicRange">
                  <img className="control-img mr-3" src="./assets/images/music_off.ico" alt="music off"/>
                    <Form.Control type="range" />
                  <img className="control-img ml-3" src="./assets/images/music_max.ico" alt="music max"/>
                </Form.Group>
              </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>  
      <Footer />
    </div>
  );
};
