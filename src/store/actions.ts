import { runInContext } from 'vm';
import { failPlayer, winPlayer } from '..';
import { GAME_FAILED, GAME_WON, RESET_TIMER, RESTART_GAME, SET_TIMER_STATE, UPDATE_GAME_FIELD, UPDATE_SCORE } from './actionTypes';
import {DispatchGame} from './gameReducer'

export function generateInitalField(size = 4) {
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

export function getNextLang (currentLang: string) {
  const langs = ['en', 'ru', 'fr']
  let newLangIndex = langs.indexOf(currentLang) + 1;
  //newLangIndex = 
  return langs[newLangIndex < langs.length ? newLangIndex : 0]
}

export function getNextTheme (currentTheme: string) {
  const themes = ['shadow', 'sweet', 'deep']
  let newLangIndex = themes.indexOf(currentTheme) + 1;
  //newLangIndex = 
  return themes[newLangIndex < themes.length ? newLangIndex : 0]
}

export function getNextDifficulty (currentDifficulty: number) {
  const difficulties = [4, 5, 6]
  let newLangIndex = difficulties.indexOf(currentDifficulty) + 1;
  //newLangIndex = 
  return difficulties[newLangIndex < difficulties.length ? newLangIndex : 0]
}


function generateNewCell(field: Array<Array<number>>) {
  const size = field.length;
  let emptyCells: Array<Array<number>> = [];
  field.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 0) {
        emptyCells.push([rowIndex, colIndex])
      }
    })
  })

  if (emptyCells.length > 0) {
    const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    field[x][y] = 2;
  }
  
}

export function moveUp(field: Array<Array<number>>):number {
  let currentSum = 0;
  for(let j = 0; j < field.length; j++) {
    for(let _ = 0; _ < field.length; _ ++) {
      for(let i = 1; i < field.length; i ++) {
        if (field[i-1][j] === 0) {
          field[i-1][j] = field[i][j];
          field[i][j] = 0;
        }
        if ((field[i-1][j] !== 0) && field[i-1][j] === field[i][j]) {
          field[i-1][j] = field[i][j] + field[i-1][j];
          currentSum = currentSum + field[i-1][j];
          field[i][j] = 0;
        } 
      }
    }
  }
  return currentSum;
}

export function moveDown(field: Array<Array<number>>) {
  let currentSum = 0;
  for(let j = 0; j < field.length; j++) {
    for(let _ = 0; _ < field.length; _ ++) {
      for(let i = field.length -2; i >= 0; i --) {      
        if (field[i+1][j] === 0) {
          field[i+1][j] = field[i][j];
          field[i][j] = 0;
        }
        if ((field[i+1][j] !== 0) && field[i+1][j] === field[i][j]) {
          field[i+1][j] = field[i][j] + field[i+1][j];
          currentSum = currentSum + field[i+1][j];
          field[i][j] = 0;
        }
      }
    }
  }
  return currentSum;
}

export function moveLeft(field: Array<Array<number>>) {
  let currentSum = 0;
  for(let i = 0; i < field.length; i ++) {
    for(let _ = 0; _ < field.length; _ ++) {
      for(let j = 1; j < field.length ; j++) {    
        if (field[i][j-1] === 0) {
          field[i][j-1] = field[i][j];
          field[i][j] = 0;
        }
        if ((field[i][j-1] !== 0) && field[i][j-1] === field[i][j]) {
          field[i][j-1] = field[i][j] + field[i][j-1];
          currentSum = currentSum + field[i][j-1];
          field[i][j] = 0;
        }
      }
    }  
  }
  return currentSum;
}

export function moveRight(field: Array<Array<number>>) {
  let currentSum = 0;
  for(let i = 0; i < field.length; i ++) {
    for(let _ = 0; _ < field.length; _ ++) {
      for(let j = field.length - 2; j >=0 ; j--) {    
        if (field[i][j+1] === 0) {
          field[i][j+1] = field[i][j];
          field[i][j] = 0;
        }
        if ((field[i][j+1] !== 0) && field[i][j+1] === field[i][j]) {
          field[i][j+1] = field[i][j] + field[i][j+1];
          currentSum = currentSum + field[i][j+1];
          field[i][j] = 0;
        }
      }
    }  
  }
  return currentSum;
}


function checkForNextMove(field: Array<Array<number>>) {
  let isPossible = false;

  //moveUp
  for(let i = 1; i < field.length; i ++) {
    for(let j = 0; j < field.length; j++) {      
      if (field[i-1][j] === 0) {
        isPossible = true;
      }
      if ((field[i-1][j] !== 0) && field[i-1][j] === field[i][j]) {
        isPossible = true;
      }
    }
  }

  //moveDown
  for(let i = field.length -2; i >= 0; i --) {
    for(let j = 0; j < field.length; j++) {      
      if (field[i+1][j] === 0) {
        isPossible = true;
      }
      if ((field[i+1][j] !== 0) && field[i+1][j] === field[i][j]) {
        isPossible = true;
      }
    }
  }

  //moveleft
  for(let j = 1; j < field.length ; j++) {      
    for(let i = 0; i < field.length; i ++) {    
      if (field[i][j-1] === 0) {
        isPossible = true;
      }
      if ((field[i][j-1] !== 0) && field[i][j-1] === field[i][j]) {
        isPossible = true;
      }
    }
  }

  //moveRight
  for(let j = field.length - 2; j >=0 ; j--) {      
    for(let i = 0; i < field.length; i ++) {    
      if (field[i][j+1] === 0) {
        isPossible = true;
      }
      if ((field[i][j+1] !== 0) && field[i][j+1] === field[i][j]) {
        isPossible = true;
      }
    }
  }
  
  return isPossible
}

function checkIsWin (field: Array<Array<number>>) {
  let res = false;
  field.forEach((row: Array<number>) => {
    row.forEach((value: number) => {
      if (value === 2048) {
        res = true;
      }
    })
  })
  return res;
}

export function handleMove(curentGameField: Array<Array<number>>, move: string, cellSoundsPlayer: HTMLAudioElement) {
  const newGameField = [...curentGameField];
  let currentSum = 0;
  switch(move) {
    case 'ArrowUp':
      currentSum = moveUp(newGameField);
      break
    case 'ArrowDown':
      currentSum = moveDown(newGameField);
      break
    case 'ArrowLeft':
      currentSum = moveLeft(newGameField)
      break
    case 'ArrowRight':      
      currentSum = moveRight(newGameField)
      break          
    default:
      break
  }

  if (checkIsWin(newGameField)) {    
    return (dispatch: DispatchGame) => {
      dispatch({type: SET_TIMER_STATE, isTimerOn: false})
      dispatch({type: RESET_TIMER, resetTimer: true})
      dispatch ({type: GAME_WON, isWin: true, isGameStarted: false})
      winPlayer.play();
    };
  } else {
    generateNewCell(newGameField)
    if (checkForNextMove(newGameField)) {
      return (dispatch: DispatchGame) => {      
        dispatch ({type: UPDATE_GAME_FIELD, field: newGameField})
        dispatch ({type: UPDATE_SCORE, currentSum: currentSum})
        cellSoundsPlayer.play()
      };
    } else {
      return (dispatch: DispatchGame) => {
        dispatch({type: SET_TIMER_STATE, isTimerOn: false})
        dispatch({type: RESET_TIMER, resetTimer: true})
        dispatch ({type: GAME_FAILED, isFail: true, isGameStarted: false})
        // Звук когда проиграли
        failPlayer.play();
      };
    }
  }

}

export function closeFailModal() {
  return (dispatch: DispatchGame) => {
    dispatch ({type: GAME_FAILED, isFail: false, isGameStarted: false})
    dispatch ({type: RESTART_GAME})
  }
}

export function closeWinModal() {
  return (dispatch: DispatchGame) => {
    dispatch ({type: GAME_WON, isWin: false, isGameStarted: false})
    dispatch ({type: RESTART_GAME})
  }
}