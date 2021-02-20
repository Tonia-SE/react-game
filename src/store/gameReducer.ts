import { generateInitalField } from './actions';
import { FINISH_GAME, START_GAME, TOGGLE_FULLSCREEN, UPDATE_GAME_FIELD, RESTART_GAME, SET_GAME_SIZE } from './actionTypes';

export interface IGameState {
  isGameStarted: boolean;
  isFullScreen: boolean;
  field: Array<Array<number>>
  gameSize: number
}

interface IGameAction {
  type: string;
  isGameStarted?: boolean;
  isFullScreen?: boolean;
  gameSize?: number;
  field?: Array<Array<number>>
}

let initialState: IGameState = {
  isGameStarted: false,
  isFullScreen: false,
  field: generateInitalField(),
  gameSize: 4
};

const savedGameState = localStorage.getItem('gameState')
if (savedGameState !== null) {
  initialState = JSON.parse(savedGameState)
}


export type DispatchGame = (args: IGameAction) => IGameAction;

export const gameReducer = (state: IGameState = initialState, action: IGameAction) => {
  switch (action.type) {
    case START_GAME:
      const newGameField = [...generateInitalField(state.gameSize)]
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: newGameField, isGameStarted: true }));
      return { ...state, field: [...newGameField], isGameStarted: true };
    case RESTART_GAME:
      const toggleGameStarted = !state.isGameStarted;
      const newGameField2 = [...generateInitalField(state.gameSize)]
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: newGameField2, isGameStarted: toggleGameStarted}));
      return { ...state, field: newGameField2, isGameStarted: toggleGameStarted};
    case FINISH_GAME:
      return { ...state, isGameStarted: action.isGameStarted };
    case TOGGLE_FULLSCREEN:
      const toggleFullScreen = !state.isFullScreen
      localStorage.setItem('gameState', JSON.stringify({ ...state, isFullScreen: toggleFullScreen}));
      return { ...state, isFullScreen: toggleFullScreen};
    case UPDATE_GAME_FIELD:
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: action.field }));
      return { ...state, field: action.field};
    case SET_GAME_SIZE:
      localStorage.setItem('gameState', JSON.stringify({ ...state, gameSize: action.gameSize }));
      return { ...state, gameSize: action.gameSize};      
    default:
      return state;
  }
};