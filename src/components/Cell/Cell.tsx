import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { ApplicationState } from '../../store/rootReducer';

interface CellProperties {
  value: number;
}

export const Cell: React.FC<CellProperties> = (properties: CellProperties) => {
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const maxClassName = isFullScreen ? '-max' : '';

  return (
    <CSSTransition
      in={true}
      timeout={200}
      className={`cell cell-${properties.value}-${theme} size-${+gameSize}${maxClassName}`}
      classNames="up"
      onEnter={() => {
        console.log('on!!');
      }}
      onExited={() => {
        console.log('exit!!');
      }}>
      <div>{properties.value}</div>
    </CSSTransition>
  );
};
