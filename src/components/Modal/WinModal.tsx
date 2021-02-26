import React, { useState } from 'react';
import { Button, ButtonGroup, Card, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { winPlayer } from '../..';
import { closeWinModal } from '../../store/actions';
import { ApplicationState } from '../../store/rootReducer';


export const WinModal: React.FC = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  let isWin = useSelector((state: ApplicationState) => state.game.isWin);
  const modalBackdropClassName = !isFullScreen ? "my-backdrop" : "";
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);

  winPlayer.volume = soundsVolume;

  // show={props.show}
  return (
    <Modal backdropClassName={modalBackdropClassName} show={isWin} onHide={() => {
      isWin = false
      dispatch(closeWinModal())
    }}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Card className="m-auto border-0">
          <Card.Img className="m-auto pb-3" style={{ width: '50%' }} variant="top" src="./assets/images/win.ico"/>
          <Card.Body className="px-0">
            <Card.Title className="text-center modal-game-title">Congratulations! <br/>You are win!</Card.Title>
            <Card.Text className="mx-xl-lg-3 p-0 text-center modal-game-text">
              Please login<br/>to see your name in best results table. 
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  )
}