import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Button, Form, Modal } from 'react-bootstrap';


interface SignUpFormProps  {
  show: boolean
  onHide: () => void
} 

export const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const modalBackdropClassName = !isFullScreen ? "my-backdrop" : "";
  return (
    <Modal backdropClassName={modalBackdropClassName} show ={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
          <Form.Label><p>{t("reg_form_nick_name_label")}</p></Form.Label>
            <Form.Control type="email" placeholder={t("reg_form_nick_name_placeholder")}/> 
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Label><p>{t("reg_form_password_label")}</p></Form.Label>
            <Form.Control type="password" placeholder={t("reg_form_password_placeholder")} autoComplete="on"/>
          </Form.Group>
          <Form.Group controlId="formBasicPasswordConfirm">
          <Form.Label><p>{t("reg_form_confirm_password")}</p></Form.Label>
            <Form.Control type="password" placeholder={t("reg_form_password_placeholder")} autoComplete="on"/>
            <Form.Text className="text-muted">
              <p>We'll never share your email with anyone else</p>
            </Form.Text>
          </Form.Group>
          <Button variant="danger" type="submit" className="pull-right" onClick={props.onHide}>
            <pre>{t("reg_form_submit")}</pre>
          </Button>
        </Form>
      </Modal.Body>
    </ Modal>
  )
}