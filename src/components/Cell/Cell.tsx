import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

interface CellProps {
  value: number  
}

export const Cell: React.FC<CellProps> = (props: CellProps) => {
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const cellClassName = isFullScreen ? "cell-max": "cell";
  //const isVisibleClass = props.value ? '' : "none"

  return (
    <div className="border">
      <div className={`${cellClassName} cell-${props.value}`}>
        {props.value}
      </div>
    </div>
    
  )
};
