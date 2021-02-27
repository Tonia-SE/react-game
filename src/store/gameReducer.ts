import { generateInitalField } from './actions';
import { FINISH_GAME, START_GAME, TOGGLE_FULLSCREEN,
        UPDATE_GAME_FIELD, RESTART_GAME, SET_GAME_SIZE,
        GAME_FAILED, GAME_WON, UPDATE_SCORE, SET_TIMER_STATE, RESET_TIMER } from './actionTypes';

export interface IGameState {
  isGameStarted: boolean;
  isFullScreen: boolean;
  field: Array<Array<number>>
  gameSize: number
  isFail: boolean;
  isWin: boolean;
  currentSum: number;
  score: number;
  isTimerOn: boolean;
  resetTimer: boolean;
}

interface IGameAction {
  type: string;
  isGameStarted?: boolean;
  isFullScreen?: boolean;
  gameSize?: number;
  isFail?: boolean;
  isWin?: boolean;
  field?: Array<Array<number>>
  currentSum?: number;
  isTimerOn?: boolean;
  resetTimer?: boolean;
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
  isTimerOn: false,
  resetTimer: false
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
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: newGameField, isGameStarted: true, currentSum: 0, score: 0, isTimerOn: true }));
      return { ...state, field: [...newGameField], isGameStarted: true, currentSum: 0, score: 0, isTimerOn: true };
    case RESTART_GAME:
      //const toggleGameStarted = !state.isGameStarted;
      const newGameField2 = [...generateInitalField(state.gameSize)]
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: newGameField2, isGameStarted: false, currentSum: 0, score: 0, isTimerOn: false, resetTimer: true }));
      return { ...state, field: newGameField2, isGameStarted: false, currentSum: 0, score: 0, isTimerOn: false, resetTimer: true };
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
      localStorage.setItem('gameState', JSON.stringify({ ...state, currentSum: action.currentSum, score: newScore }));
      return { ...state, currentSum: action.currentSum, score: newScore };
    case SET_TIMER_STATE:
      localStorage.setItem('gameState', JSON.stringify({ ...state, isTimerOn: action.isTimerOn }));
      return { ...state, isTimerOn: action.isTimerOn };
    case RESET_TIMER:
      localStorage.setItem('gameState', JSON.stringify({ ...state, resetTimer: action.resetTimer }));
      return { ...state, resetTimer: action.resetTimer };
    default:
      return state;
  }
};