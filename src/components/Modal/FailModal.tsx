import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Card, Modal } from 'react-bootstrap';
import { closeFailModal } from '../../store/actions';
import { failPlayer } from '../..';

export const FailModal: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  useEffect(() => {
    getI18n().changeLanguage(language);
  }, [language]);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  let isFail = useSelector((state: ApplicationState) => state.game.isFail);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);
  const isLoggedIn = useSelector((state: ApplicationState) => state.auth.isLoggedIn);
  failPlayer.volume = soundsVolume;
  const modalBackdropClassName = !isFullScreen ? 'my-backdrop' : '';
  const modalFailText = isLoggedIn ? t('modal_fail_text_logged_in') : '';

  return (
    <Modal
      backdropClassName={modalBackdropClassName}
      show={isFail}
      onHide={() => {
        isFail = false;
        dispatch(closeFailModal());
      }}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Card className="m-auto border-0">
          <Card.Img className="m-auto" variant="top" src="./assets/images/fail.jpg" />
          <Card.Body className="pt-0">
            <Card.Title className="text-center modal-game-title">{t('modal_fail_title')}</Card.Title>
            <Card.Text className="mx-xl-lg-3 text-center modal-game-text">{modalFailText}</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};
