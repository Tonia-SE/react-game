import { generateInitalField } from './actions';
import { FINISH_GAME, START_GAME, TOGGLE_FULLSCREEN, UPDATE_GAME_FIELD, RESTART_GAME, SET_GAME_SIZE, GAME_FAILED, GAME_WON, UPDATE_SCORE } from './actionTypes';

export interface IGameState {
  isGameStarted: boolean;
  isFullScreen: boolean;
  field: Array<Array<number>>
  gameSize: number
  isFail: boolean;
  isWin: boolean;
  currentSum: number;
  score: number;
}

interface IGameAction {
  type: string;
  isGameStarted?: boolean;
  isFullScreen?: boolean;
  gameSize?: number;
  isFail?: boolean;
  isWin?: boolean;
  field?: Array<Array<number>>
  currentSum?: number
}

let initialState: IGameState = {
  isGameStarted: false,
  isFullScreen: false,
  field: generateInitalField(),
  isFail: false,
  isWin: false,
  gameSize: 4,
  currentSum: 0,
  score: 0,
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
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: newGameField, isGameStarted: true, currentSum: 0, score: 0 }));
      return { ...state, field: [...newGameField], isGameStarted: true, currentSum: 0, score: 0 };
    case RESTART_GAME:
      //const toggleGameStarted = !state.isGameStarted;
      const newGameField2 = [...generateInitalField(state.gameSize)]
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: newGameField2, isGameStarted: false, currentSum: 0, score: 0 }));
      return { ...state, field: newGameField2, isGameStarted: false, currentSum: 0, score: 0 };
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
    case GAME_FAILED:
      localStorage.setItem('gameState', JSON.stringify({ ...state, isFail: action.isFail, isGameStarted: action.isGameStarted }));
      return { ...state, isFail: action.isFail, isGameStarted: action.isGameStarted };
    case GAME_WON:
      localStorage.setItem('gameState', JSON.stringify({ ...state, isWin: action.isWin, isGameStarted: action.isGameStarted }));
      return { ...state, isWin: action.isWin, isGameStarted: action.isGameStarted };
    case UPDATE_SCORE:
      const newScore = state.score + action.currentSum
      //const newCurrentSum = !action.currentSum ? action.currentSum: state.currentSum;
      localStorage.setItem('gameState', JSON.stringify({ ...state, currentSum: action.currentSum, score: newScore }));
      return { ...state, currentSum: action.currentSum, score: newScore };
    default:
      return state;
  }
};