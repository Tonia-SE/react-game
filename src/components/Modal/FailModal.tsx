import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { failPlayer } from '../..';
import { closeFailModal } from '../../store/actions';
import { ApplicationState } from '../../store/rootReducer';

// interface FailModalProps  {
//   show: boolean
//   onHide: () => void
// }

export const FailModal: React.FC = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  let isFail = useSelector((state: ApplicationState) => state.game.isFail);
  const modalBackdropClassName = !isFullScreen ? "my-backdrop" : "";
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);

  failPlayer.volume = soundsVolume

  return (
    <Modal backdropClassName={modalBackdropClassName} show={isFail} onHide={() => {
        isFail = false
        dispatch(closeFailModal())
      }}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Card className="m-auto border-0">
          <Card.Img className="m-auto" variant="top" src="./assets/images/fail.jpg"/>
          <Card.Body className="pt-0">
            <Card.Title className="text-center modal-game-title">Sorry, you're fail...</Card.Title>
            <Card.Text className="mx-xl-lg-3 text-center modal-game-text">
              But if you logged in, maybe you'll find your name in best result's table. 
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  )
}
