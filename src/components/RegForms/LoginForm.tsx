import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

interface LoginFormProps  {
  show: boolean
  onHide: () => void
}

export const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const modalBackdropClassName = !isFullScreen ? "my-backdrop" : "";

  return (
    <Modal backdropClassName={modalBackdropClassName} show={props.show} onHide={props.onHide}>

      <Modal.Header closeButton>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <p>NICK NAME</p>
            </Form.Label>
            <Form.Control type="email" placeholder="nick name" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label><p>PASSWORD</p></Form.Label>
            <Form.Control type="password" placeholder="password" autoComplete="on"/>
            <Form.Text className="text-muted">
              <p>We'll never share your email with anyone else.</p>
            </Form.Text>
          </Form.Group>

          <Button variant="danger" type="submit" className="pull-right" onClick={props.onHide}>
            <p>Submit</p>
          </Button>
        </Form>
      </Modal.Body>

    </Modal>
  )
}