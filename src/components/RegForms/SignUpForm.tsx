import React, { useEffect, useState, FormEvent } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Button, Form, Modal } from 'react-bootstrap';
import { RESET_FAILED_ATTEMPT } from '../../store/actionTypes';
import { regUser } from '../../store/authReducer';


interface SignUpFormProps  {
  show: boolean
  onHide: () => void
} 

export const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const isFailedAttempt = useSelector((state: ApplicationState) => state.auth.isFailedAttempt);
  const isRegristred = useSelector((state: ApplicationState) => state.auth.isRegristred);
  const modalHeaderWidth = language === 'fr'? '350px': '280px'
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const modalBackdropClassName = !isFullScreen ? "my-backdrop" : "";

  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])
  const [username, setUserName] = useState('');
  const [usernameTooLong, setUsernameTooLong] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordTooShort, setPasswordTooShort] = useState(false);

  useEffect(()=>{
    if (isRegristred) {
      props.onHide()
    }
  },[isRegristred])

  return (
    <Modal backdropClassName={modalBackdropClassName} show ={props.show} onHide={props.onHide}
      onSubmit ={(e: FormEvent ) => {
        if (!isRegristred) {
          e.preventDefault(); 
        }
      }}>
      <Modal.Header closeButton style={{ width: modalHeaderWidth }}>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
          <Form.Label><p>{t("reg_form_nick_name_label")}</p></Form.Label>
            <Form.Control type="text" placeholder={t("reg_form_nick_name_placeholder")}
              onChange={ (event) => {
                setUserName(event.currentTarget.value)
              }}
              onFocus={()=>{
                dispatch({type: RESET_FAILED_ATTEMPT })
                setPasswordMatch(true)
                setPasswordTooShort(false)
                setUsernameTooLong(false)
              }}/> 
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Label><p>{t("reg_form_password_label")}</p></Form.Label>
            <Form.Control type="password" placeholder={t("reg_form_password_placeholder")} autoComplete="on"
              onChange={ (event) => {
                setPassword1(event.currentTarget.value)
              }}
              onFocus={()=>{
                dispatch({type: RESET_FAILED_ATTEMPT })
                setPasswordMatch(true)
                setPasswordTooShort(false)
                setUsernameTooLong(false)
              }}            
            />
          </Form.Group>
          <Form.Group controlId="formBasicPasswordConfirm">
          <Form.Label><p>{t("reg_form_confirm_password")}</p></Form.Label>
            <Form.Control type="password" placeholder={t("reg_form_password_placeholder")} autoComplete="on"
              onChange={ (event) => {
                setPassword2(event.currentTarget.value)
              }}
              onFocus={()=>{
                dispatch({type: RESET_FAILED_ATTEMPT })
                setPasswordMatch(true)
                setPasswordTooShort(false)
                setUsernameTooLong(false)
              }}            
            />
            <Form.Text className="text-muted danger">      
            {isFailedAttempt ? <p className="my-danger">{t("sign_up_form_form_username_exist_message")}</p>: <p></p>}
            {!passwordMatch ? <p className="my-danger">{t("sign_up_form_form_different_passwords_message")}</p>: <p></p>}
            {passwordTooShort ? <p className="my-danger">{t("sign_up_form_form_short_password_message")}</p>: <p></p>}
            {usernameTooLong ? <p className="my-danger">{t("sign_up_form_form_long_username_message")}</p>: <p></p>}
            </Form.Text>
          </Form.Group>
          <Button variant="danger" type="submit" className="pull-right" onClick={() => {
            if (username.length < 10) {
              if (password1.length < 6) {
                setPasswordTooShort(true)
              } else if (password1 !== password2) {
                setPasswordMatch(false)
              } else {
                dispatch(regUser(username, password1))
              }
            } else {
              setUsernameTooLong(true)
            }
          }}>
            <pre>{t("reg_form_submit")}</pre>
          </Button>
        </Form>
      </Modal.Body>
    </ Modal>
  )
}