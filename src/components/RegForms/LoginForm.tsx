import React, { FormEvent, useEffect, useState } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Button, Form, Modal } from 'react-bootstrap';

import { loginUser } from '../../store/authReducer';
import { RESET_FAILED_ATTEMPT } from '../../store/actionTypes';

interface LoginFormProps  {
  show: boolean
  onHide: () => void
}

export const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])

  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const isFailedAttempt = useSelector((state: ApplicationState) => state.auth.isFailedAttempt);
  const isLoggedIn = useSelector((state: ApplicationState) => state.auth.isLoggedIn);
  const modalBackdropClassName = !isFullScreen ? "my-backdrop" : "";
  
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    if (isLoggedIn) {
      props.onHide()
    }
  },[isLoggedIn])

  return (
    <Modal backdropClassName={modalBackdropClassName} show={props.show} onHide={props.onHide}
      onSubmit ={(e: FormEvent )=>{
        if (!isLoggedIn) {
          e.preventDefault();
        }
      }}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Form className="my-modal-form">
          <Form.Group  controlId="formBasicEmail">
            <Form.Label>
              <p>{t("reg_form_nick_name_label")}</p>
            </Form.Label>
            <Form.Control name="username" type="text" placeholder={t("reg_form_nick_name_placeholder")}
              onChange={ (event) => {
                  setUserName(event.currentTarget.value)
              }}
              onFocus={()=>{
                dispatch({type: RESET_FAILED_ATTEMPT })
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Label><p>{t("reg_form_password_label")}</p></Form.Label>
            <Form.Control type="password" placeholder={t("reg_form_password_placeholder")} autoComplete="on"
              onChange={ (event) => {
                setPassword(event.currentTarget.value)
              }}
              onFocus={()=>{
                dispatch({type: RESET_FAILED_ATTEMPT })
              }}
            />
            <Form.Text>
              {isFailedAttempt ? <p className="my-danger">{t("login_form_failed_login_message")}</p>: <p></p>}
            </Form.Text>
          </Form.Group>
          <Button variant="danger" type="submit" className="pull-right" onClick={() => {            
            dispatch(loginUser(username, password))
          }}>
            <pre>{t("reg_form_submit")}</pre>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}