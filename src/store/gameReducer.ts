import { FINISH_GAME, START_GAME, TOGGLE_FULLSCREEN, UPDATE_GAME_FIELD, RESTART_GAME } from './actionTypes';

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
  field?: Array<Array<number>>
}

function generateInitalField(size = 4) {
  const res = Array(size).fill([]).map(() => Array(size).fill(0));
  const cellPos1 = [ Math.floor(Math.random()*size), Math.floor(Math.random()*size) ]
  let cellPos2 = [ Math.floor(Math.random()*size), Math.floor(Math.random()*size) ]

  while (true) {
    if (JSON.stringify(cellPos1) === JSON.stringify(cellPos2)) {
      cellPos2 = [ Math.floor(Math.random()*size), Math.floor(Math.random()*size) ]
    } else {
      break
    }
  }

  res[cellPos1[0]][cellPos1[1]] = 2
  res[cellPos2[0]][cellPos2[1]] = 2
  return res;
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
      const newGameField = [...generateInitalField()]
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: [... newGameField], isGameStarted: action.isGameStarted }));
      return { ...state, field: [...newGameField], isGameStarted: action.isGameStarted };
    case RESTART_GAME:
      const toggleGameStarted = !state.isGameStarted;
      localStorage.setItem('gameState', JSON.stringify({ ...state, isGameStarted: toggleGameStarted}));
      return { ...state, isGameStarted: toggleGameStarted};
    case FINISH_GAME:
      return { ...state, isGameStarted: action.isGameStarted };
    case TOGGLE_FULLSCREEN:
      const toggleFullScreen = !state.isFullScreen
      localStorage.setItem('gameState', JSON.stringify({ ...state, isFullScreen: toggleFullScreen}));
      return { ...state, isFullScreen: toggleFullScreen};
    case UPDATE_GAME_FIELD:
      localStorage.setItem('gameState', JSON.stringify({ ...state, field: [...action.field] }));
      return { ...state, field: [...action.field]};
    default:
      return state;
  }
};