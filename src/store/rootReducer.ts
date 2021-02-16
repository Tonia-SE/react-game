import { combineReducers, Reducer } from 'redux';
import { loaderReducer, ILoaderState } from './loaderReducer';

export interface ApplicationState {
  loader: ILoaderState;
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  loader: loaderReducer,
});
