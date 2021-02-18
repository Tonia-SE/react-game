import { combineReducers, Reducer } from 'redux';
import { loaderReducer, ILoaderState } from './loaderReducer';
//import { loaderReducer, ILoaderState } from './loaderReducer';
import { gameReducer, IGameState } from './gameReducer';

export interface ApplicationState {
  loader: ILoaderState;
  game: IGameState
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  loader: loaderReducer,
  game: gameReducer,
});
