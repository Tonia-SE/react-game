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
        <Card className="my-card m-2" style={{ width: '18rem' }}>
          <Card.Header>Difficulty</Card.Header>
          <ListGroup variant="flush"> 
            <ListGroup.Item>
              4 x 4
              <input type="radio" id="english" value="english"/>
            </ListGroup.Item>
            <ListGroup.Item>
              5 x 5
              <input type="radio" id="russian" value="russian"/>
            </ListGroup.Item>
            <ListGroup.Item>
              6 x 6
              <input type="radio" id="chinese" value="chinese"/>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="my-card m-2" style={{ width: '18rem' }}>
          <Card.Header>Theme</Card.Header>
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
        <Card className="my-card m-2" style={{ width: '18rem' }}>
          <Card.Header>Language</Card.Header>
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
          <Card className="my-card text-center m-2">
            <Card.Body className="my-card-body">
              <Card.Title>Sounds</Card.Title>
              <Card.Text>
              <Form>
                <Form.Group className="range-group" controlId="formBasicRange">
                  <img className="control-img mr-3" src="./assets/images/sounds_off.ico" alt="sounds off"/>
                    <Form.Control type="range" />
                  <img className="control-img ml-3" src="./assets/images/sounds_max.ico" alt="sounds max"/>
                </Form.Group>
              </Form>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-card text-center m-2">
            <Card.Body className="my-card-body">
              <Card.Title>Music</Card.Title>
              <Card.Text>
              <Form>
                <Form.Group className="range-group" controlId="formBasicRange">
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
