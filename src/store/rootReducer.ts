import { combineReducers, Reducer } from 'redux';
import { loaderReducer, ILoaderState } from './loaderReducer';
//import { loaderReducer, ILoaderState } from './loaderReducer';
import { gameReducer, IGameState } from './gameReducer';
import { settingsReducer, ISettingsState } from './settingsReducer';

export interface ApplicationState {
  loader: ILoaderState;
  game: IGameState;
  settings: ISettingsState;
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  loader: loaderReducer,
  game: gameReducer,
  settings: settingsReducer,
});
