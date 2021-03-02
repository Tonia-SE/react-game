import { failPlayer, winPlayer } from '..';
import { GAME_FAILED, GAME_WON, RESET_TIMER, RESTART_GAME, SET_TIMER_STATE, UPDATE_GAME_FIELD, UPDATE_MOVES, UPDATE_SCORE } from './actionTypes';
import { DispatchGame } from './gameReducer';

export function generateInitalField(size = 4) {
  const res = Array(size)
    .fill([])
    .map(() => Array(size).fill(0));
  const cellPos1 = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
  let cellPos2 = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];

  while (true) {
    if (JSON.stringify(cellPos1) === JSON.stringify(cellPos2)) {
      cellPos2 = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
    } else {
      break;
    }
  }

  res[cellPos1[0]][cellPos1[1]] = 2;
  res[cellPos2[0]][cellPos2[1]] = Math.floor(Math.random() * 100) > 10 ? 2 : 4;
  return res;
}

export function getNextLang(currentLang: string) {
  const langs = ['en', 'ru', 'fr'];
  let newLangIndex = langs.indexOf(currentLang) + 1;
  return langs[newLangIndex < langs.length ? newLangIndex : 0];
}

export function getNextTheme(currentTheme: string) {
  const themes = ['shadow', 'sweet', 'deep'];
  let newLangIndex = themes.indexOf(currentTheme) + 1;
  return themes[newLangIndex < themes.length ? newLangIndex : 0];
}

export function getNextDifficulty(currentDifficulty: number) {
  const difficulties = [4, 5, 6];
  let newLangIndex = difficulties.indexOf(currentDifficulty) + 1;
  return difficulties[newLangIndex < difficulties.length ? newLangIndex : 0];
}

function generateNewCell(field: Array<Array<number>>) {
  let emptyCells: Array<Array<number>> = [];
  field.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 0) {
        emptyCells.push([rowIndex, colIndex]);
      }
    });
  });

  if (emptyCells.length > 0) {
    const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    field[x][y] = Math.floor(Math.random() * 100) > 10 ? 2 : 4;
  }
}

export function moveUp(field: Array<Array<number>>, movesArray: Array<Array<{}>>): number {
  let currentSum = 0;
  let empty = 0;
  let withValue = 0;

  for (let j = 0; j < field.length; j++) {
    empty = 0;
    withValue = 0;
    for (let i = 0; i < field.length; i++) {
      if (field[i][j] !== 0 && i != 0) {
        if (field[i][j] === field[withValue][j] && i !== 0) {
          movesArray[i][j] = { kind: 'add', value: field[withValue][j], dest: [withValue, j] };
          field[withValue][j] = field[withValue][j] * 2;
          field[i][j] = 0;
          withValue++;
          currentSum = field[withValue][j];
        } else {
          const tmp = field[i][j];
          field[i][j] = 0;
          field[empty][j] = tmp;
          withValue = empty;
          empty++;
          if (i !== withValue) {
            movesArray[i][j] = { kind: 'move', value: tmp, dest: [withValue, j] };
          }
        }
      }
      if (field[i][j] !== 0 && i === 0) {
        empty++;
      }
    }
  }

  return currentSum;
}

export function moveDown(field: Array<Array<number>>, movesArray: Array<Array<{}>>) {
  let currentSum = 0;
  let empty = 0;
  let withValue = 0;

  for (let j = 0; j < field.length; j++) {
    empty = field.length - 1;
    withValue = field.length - 1;
    for (let i = field.length - 1; i >= 0; i--) {
      if (field[i][j] !== 0 && i != field.length - 1) {
        if (field[i][j] === field[withValue][j] && i !== field.length - 1) {
          movesArray[i][j] = { kind: 'add', value: field[withValue][j], dest: [withValue, j] };
          field[withValue][j] = field[withValue][j] * 2;
          field[i][j] = 0;
          withValue--;
          currentSum = field[withValue][j];
        } else {
          const tmp = field[i][j];
          field[i][j] = 0;
          field[empty][j] = tmp;
          withValue = empty;
          empty--;
          if (i !== withValue) {
            movesArray[i][j] = { kind: 'move', value: tmp, dest: [withValue, j] };
          }
        }
      }
      if (field[i][j] !== 0 && i === field.length - 1) {
        empty--;
      }
    }
  }

  return currentSum;
}

export function moveLeft(field: Array<Array<number>>, movesArray: Array<Array<{}>>) {
  let currentSum = 0;
  let empty = 0;
  let withValue = 0;

  for (let i = 0; i < field.length; i++) {
    empty = 0;
    withValue = 0;
    for (let j = 0; j < field.length; j++) {
      if (field[i][j] !== 0 && j != 0) {
        if (field[i][j] === field[i][withValue] && j !== 0) {
          movesArray[i][j] = { kind: 'add', value: field[i][withValue], dest: [i, withValue] };
          field[i][withValue] = field[i][withValue] * 2;
          field[i][j] = 0;
          withValue++;
          currentSum = field[i][withValue];
        } else {
          const tmp = field[i][j];
          field[i][j] = 0;
          field[i][empty] = tmp;
          withValue = empty;
          empty++;
          if (j !== withValue) {
            movesArray[i][j] = { kind: 'move', value: tmp, dest: [i, withValue] };
          }
        }
      }
      if (field[i][j] !== 0 && j === 0) {
        empty++;
      }
    }
  }

  return currentSum;
}

export function moveRight(field: Array<Array<number>>, movesArray: Array<Array<{}>>) {
  let currentSum = 0;
  let empty = 0;
  let withValue = 0;

  for (let i = 0; i < field.length; i++) {
    empty = field.length - 1;
    withValue = field.length - 1;
    for (let j = field.length - 1; j >= 0; j--) {
      if (field[i][j] !== 0 && j != field.length - 1) {
        if (field[i][j] === field[i][withValue] && j !== field.length - 1) {
          movesArray[i][j] = { kind: 'add', value: field[i][withValue], dest: [i, withValue] };
          field[i][withValue] = field[i][withValue] * 2;
          field[i][j] = 0;
          withValue--;
          currentSum = field[i][withValue];
        } else {
          const tmp = field[i][j];
          field[i][j] = 0;
          field[i][empty] = tmp;
          withValue = empty;
          empty--;
          if (j !== withValue) {
            movesArray[i][j] = { kind: 'move', value: tmp, dest: [i, withValue] };
          }
        }
      }
      if (field[i][j] !== 0 && j === field.length - 1) {
        empty--;
      }
    }
  }

  return currentSum;
}

function checkForNextMove(field: Array<Array<number>>) {
  let isPossible = false;

  //moveUp
  for (let i = 1; i < field.length; i++) {
    for (let j = 0; j < field.length; j++) {
      if (field[i - 1][j] === 0) {
        isPossible = true;
      }
      if (field[i - 1][j] !== 0 && field[i - 1][j] === field[i][j]) {
        isPossible = true;
      }
    }
  }

  //moveDown
  for (let i = field.length - 2; i >= 0; i--) {
    for (let j = 0; j < field.length; j++) {
      if (field[i + 1][j] === 0) {
        isPossible = true;
      }
      if (field[i + 1][j] !== 0 && field[i + 1][j] === field[i][j]) {
        isPossible = true;
      }
    }
  }

  //moveleft
  for (let j = 1; j < field.length; j++) {
    for (let i = 0; i < field.length; i++) {
      if (field[i][j - 1] === 0) {
        isPossible = true;
      }
      if (field[i][j - 1] !== 0 && field[i][j - 1] === field[i][j]) {
        isPossible = true;
      }
    }
  }

  //moveRight
  for (let j = field.length - 2; j >= 0; j--) {
    for (let i = 0; i < field.length; i++) {
      if (field[i][j + 1] === 0) {
        isPossible = true;
      }
      if (field[i][j + 1] !== 0 && field[i][j + 1] === field[i][j]) {
        isPossible = true;
      }
    }
  }
  return isPossible;
}

function checkIsWin(field: Array<Array<number>>) {
  let res = false;
  field.forEach((row: Array<number>) => {
    row.forEach((value: number) => {
      if (value === 2048) {
        res = true;
      }
    });
  });
  return res;
}

export function handleMove(curentGameField: Array<Array<number>>, move: string, cellSoundsPlayer: HTMLAudioElement) {
  const newGameField = [...curentGameField];
  const movesArray = Array(curentGameField.length)
    .fill([])
    .map(() => Array(curentGameField.length).fill({ kind: 'none', value: 0, dest: [] }));
  let currentSum = 0;
  switch (move) {
    case 'ArrowUp':
      currentSum = moveUp(newGameField, movesArray);
      break;
    case 'ArrowDown':
      currentSum = moveDown(newGameField, movesArray);
      break;
    case 'ArrowLeft':
      currentSum = moveLeft(newGameField, movesArray);
      break;
    case 'ArrowRight':
      currentSum = moveRight(newGameField, movesArray);
      break;
    default:
      break;
  }

  if (checkIsWin(newGameField)) {
    return (dispatch: DispatchGame) => {
      dispatch({ type: UPDATE_SCORE, currentSum: currentSum });
      dispatch({ type: SET_TIMER_STATE, isTimerOn: false });
      dispatch({ type: GAME_WON, isWin: true, isGameStarted: false });
      winPlayer.play();
    };
  } else {
    generateNewCell(newGameField);
    if (checkForNextMove(newGameField)) {
      return (dispatch: DispatchGame) => {
        dispatch({ type: UPDATE_MOVES, moves: movesArray, direction: move });
        dispatch({ type: UPDATE_GAME_FIELD, field: newGameField });
        dispatch({ type: UPDATE_SCORE, currentSum: currentSum });
        cellSoundsPlayer.play();
      };
    } else {
      return (dispatch: DispatchGame) => {
        dispatch({ type: SET_TIMER_STATE, isTimerOn: false });
        dispatch({ type: RESET_TIMER, resetTimer: true });
        dispatch({ type: GAME_FAILED, isFail: true, isGameStarted: false });
        failPlayer.play();
      };
    }
  }
}

export function closeFailModal() {
  return (dispatch: DispatchGame) => {
    dispatch({ type: GAME_FAILED, isFail: false, isGameStarted: false });
    dispatch({ type: RESTART_GAME });
  };
}

export function closeWinModal() {
  return (dispatch: DispatchGame) => {
    dispatch({ type: GAME_WON, isWin: false, isGameStarted: false });
    dispatch({ type: RESTART_GAME });
  };
}
