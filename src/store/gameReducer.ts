import { FINISH_GAME, START_GAME, TOGGLE_FULLSCREEN } from './actionTypes';

export interface IGameState {
  isGameStarted: boolean;
  isFullScreen: boolean;
}

interface IGameAction {
  type: string;
  isGameStarted?: boolean;
  isFullScreen?: boolean;
}

const initialState: IGameState = {
  isGameStarted: false,
  isFullScreen: false,
};

export type DispatchGame = (args: IGameAction) => IGameAction;

export const gameReducer = (state: IGameState = initialState, action: IGameAction) => {
  switch (action.type) {
    case START_GAME:
      return { ...state, isGameStarted: action.isGameStarted };
    case FINISH_GAME:
      return { ...state, isGameStarted: action.isGameStarted };
    case TOGGLE_FULLSCREEN:
      return { ...state, isFullScreen: !state.isFullScreen };
    default:
      return state;
  }
};