import { UPDATE_GAME_FIELD } from './actionTypes';
import {DispatchGame} from './gameReducer'




export function handleMove(curentGameField: Array<Array<number>>, move: string) {
  const newGameField = [...curentGameField];
  switch(move) {
    case 'ArrowUp':
      newGameField[0][0] = 2048;
      break
    case 'ArrowDown':
      newGameField[3][0] = 2048;
      break
    case 'ArrowLeft':
      newGameField[0][3] = 2048;
      break
    case 'ArrowRight':
      newGameField[3][3] = 2048;
      break          
    default:
      break
  }

  
  return (dispatch: DispatchGame) => {
    dispatch ({type: UPDATE_GAME_FIELD, field: newGameField})
  };
}