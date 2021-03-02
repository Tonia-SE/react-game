import React, { useEffect, useState, FormEvent } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Button, Form, Modal } from 'react-bootstrap';
import { RESET_FAILED_ATTEMPT } from '../../store/actionTypes';
import { regUser } from '../../store/authReducer';

interface SignUpFormProps {
  show: boolean;
  onHide: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  const isFailedAttempt = useSelector((state: ApplicationState) => state.auth.isFailedAttempt);
  const isRegristred = useSelector((state: ApplicationState) => state.auth.isRegristred);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const modalBackdropClassName = !isFullScreen ? 'my-backdrop' : '';
  const [emptyUserName, setEmptyUserName] = useState(false);
  const [usernameTooLong, setUsernameTooLong] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUserName] = useState('');

  useEffect(() => {
    if (isRegristred) {
      props.onHide();
    }
  }, [isRegristred]);

  useEffect(() => {
    getI18n().changeLanguage(language);
  }, [language]);

  return (
    <Modal
      backdropClassName={modalBackdropClassName}
      show={props.show}
      onHide={() => {
        setEmptyUserName(false);
        setPasswordMatch(true);
        setPasswordTooShort(false);
        setUsernameTooLong(false);
        props.onHide();
      }}
      onSubmit={(e: FormEvent) => {
        if (!isRegristred) {
          e.preventDefault();
        }
      }}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form className="my-modal-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <p>{t('reg_form_nick_name_label')}</p>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={t('reg_form_nick_name_placeholder')}
              onChange={(event) => {
                setUserName(event.currentTarget.value);
              }}
              onFocus={() => {
                dispatch({ type: RESET_FAILED_ATTEMPT });
                setPasswordMatch(true);
                setPasswordTooShort(false);
                setUsernameTooLong(false);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <p>{t('reg_form_password_label')}</p>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder={t('reg_form_password_placeholder')}
              autoComplete="on"
              onChange={(event) => {
                setPassword1(event.currentTarget.value);
              }}
              onFocus={() => {
                dispatch({ type: RESET_FAILED_ATTEMPT });
                setPasswordMatch(true);
                setPasswordTooShort(false);
                setUsernameTooLong(false);
              }}
            />
          </Form.Group>
          <Form.Group id="confirm-password-form-group" controlId="formBasicPasswordConfirm">
            <Form.Label>
              <p>{t('reg_form_confirm_password')}</p>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder={t('reg_form_password_placeholder')}
              autoComplete="on"
              onChange={(event) => {
                setPassword2(event.currentTarget.value);
              }}
              onFocus={() => {
                dispatch({ type: RESET_FAILED_ATTEMPT });
                setPasswordMatch(true);
                setPasswordTooShort(false);
                setUsernameTooLong(false);
              }}
            />
            <Form.Text className="text-muted danger">
              {isFailedAttempt ? <p className="my-danger">{t('sign_up_form_form_username_exist_message')}</p> : <p></p>}
              {!passwordMatch ? <p className="my-danger">{t('sign_up_form_form_different_passwords_message')}</p> : <p></p>}
              {passwordTooShort ? (
                <p className="my-danger">
                  {t('sign_up_form_form_short_password_message')}
                  <br />
                  {t('sign_up_form_form_short_password_message_second_part')}
                </p>
              ) : (
                <p></p>
              )}
              {usernameTooLong ? (
                <p className="my-danger">
                  {t('sign_up_form_form_long_username_message')}
                  <br />
                  {t('sign_up_form_form_long_username_message_second_part')}
                </p>
              ) : (
                <p></p>
              )}
              {emptyUserName ? <p className="my-danger">{t('reg_form_empty_username')}</p> : <p></p>}
            </Form.Text>
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className="pull-right"
            onClick={() => {
              if (username.length === 0) {
                setEmptyUserName(true);
              } else if (password1.length < 6) {
                setPasswordTooShort(true);
              } else if (password1 !== password2) {
                setPasswordMatch(false);
              } else if (username.length > 9) {
                setUsernameTooLong(true);
              } else {
                dispatch(regUser(username, password1));
              }
            }}>
            <pre>{t('reg_form_submit')}</pre>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
