import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';
import { Card, Modal } from 'react-bootstrap';
import { closeWinModal } from '../../store/actions';
import { winPlayer } from '../..';

export const WinModal: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  let isWin = useSelector((state: ApplicationState) => state.game.isWin);
  const modalBackdropClassName = !isFullScreen ? "my-backdrop" : "";
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);

  winPlayer.volume = soundsVolume;

  return (
    <Modal backdropClassName={modalBackdropClassName} show={isWin} onHide={() => {
      isWin = false
      dispatch(closeWinModal())
    }}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Card className="m-auto border-0">
          <Card.Img className="m-auto pb-3 win-img" variant="top" src="./assets/images/win.ico"/>
          <Card.Body className="px-0">
            <Card.Title className="text-center modal-game-title">{t('modal_win_title_first_line')}<br/>{t('modal_win_title_second_line')}</Card.Title>
            <Card.Text className="mx-xl-lg-3 text-center modal-game-text">
            {t('modal_win_text_first_line')}<br/>{t('modal_win_text_second_line')} 
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  )
}