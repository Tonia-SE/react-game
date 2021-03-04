import { backendServer } from '../consts';
import { GET_BEST_RESULTS } from './actionTypes';

type GameResultsList = Array<{
  user: string;
  score: number;
  seconds: number;
  minutes: number;
}>;

export interface IBestResultsState {
  results: GameResultsList;
}

interface IBestResultsAction {
  type: string;
  results: GameResultsList;
}

const initialState: IBestResultsState = {
  results: [],
};

export type DispatchBestResults = (args: IBestResultsAction) => IBestResultsAction;

export const bestResultsReducer = (state: IBestResultsState = initialState, action: IBestResultsAction) => {
  switch (action.type) {
    case GET_BEST_RESULTS:
      return { ...state, results: action.results };
    default:
      return state;
  }
};

export function getGameResults() {
  return async (dispatch: DispatchBestResults) => {
    try {
      const response = await fetch(`${backendServer}/results`);
      const json = await response.json();
      console.log(json);
      dispatch({
        type: GET_BEST_RESULTS,
        results: json,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function saveGameResult(user: string, score: number, seconds: number, minutes: number) {
  try {
    fetch(`${backendServer}/results`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ user: user, seconds: seconds, minutes: minutes, score: score }),
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
  } catch (e) {
    console.log(e);
  }
}
