import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { ApplicationState } from '../../store/rootReducer';

interface CellProps {
  value: number
  moveClasses: string
}

export const Cell: React.FC<CellProps> = (props: CellProps) => {
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const maxClassName = isFullScreen ? "-max": "";

  return (
      // <CSSTransition in={true} timeout={200} } 
      //   classNames="up"
      //   onEnter={()=>{
      //     console.log('on!!');
      //   }}
      //   onExited={()=>{
      //     console.log('exit!!');
      //   }}
      //   >
        <div className={`${props.moveClasses} cell cell-${props.value}-${theme} size-${+gameSize}${maxClassName}`}>
            {props.value}
        </div>
      // </CSSTransition>
  )
};
