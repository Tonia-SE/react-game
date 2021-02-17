import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface SignUpFormProps  {
  show: boolean
  onHide: () => void
} 

export const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {

  return (
    <Modal show ={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" /> 
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button variant="danger" type="submit" className="pull-right" onClick={props.onHide}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </ Modal>
  )
}