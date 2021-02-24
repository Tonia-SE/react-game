import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

interface CellProps {
  value: number  
}

export const Cell: React.FC<CellProps> = (props: CellProps) => {
  const gameSize = useSelector((state: ApplicationState) => state.game.gameSize);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const maxClassName = isFullScreen ? "-max": "";
  //const isVisibleClass = props.value ? '' : "none"

  return (
    <div className={`cell cell-${props.value}-${theme} size-${+gameSize} ${maxClassName}`}>
      {/* <div className={`cell-${props.value}`}> */}
        {props.value}
      {/* </div> */}
    </div>
  )
};
