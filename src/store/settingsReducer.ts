import { SELECT_LANGUAGE, SELECT_THEME, TOGGLE_BTNS_VISABILITY } from './actionTypes';

export interface ISettingsState {
  theme: string;
  language: string;
  isGameBtnsVisible: boolean;
}

interface ISettingsAction {
  type: string,
  theme?: string;
  language?: string;
  isGameBtnsVisible?: boolean;
}

let initialState: ISettingsState = {
  theme: 'Shadow',
  language: 'English',
  isGameBtnsVisible: false,
};

const savedSettingsState = localStorage.getItem('settingsState')
if (savedSettingsState !== null) {
  initialState = JSON.parse(savedSettingsState)
}

export type DispatchGame = (args: ISettingsAction) => ISettingsAction;

export const settingsReducer = (state: ISettingsState = initialState, action: ISettingsAction) => {
  switch (action.type) {
    case SELECT_LANGUAGE:
      localStorage.setItem('settingsState', JSON.stringify({ ...state, language: action.language }));
      return { ...state, language: action.language };
    case SELECT_THEME:
      localStorage.setItem('settingsState', JSON.stringify({ ...state, theme: action.theme }));
      return { ...state, theme: action.theme };
    case TOGGLE_BTNS_VISABILITY:
      const toggleBtnsVisability = !state.isGameBtnsVisible
      localStorage.setItem('settingsState', JSON.stringify({ ...state, isGameBtnsVisible: toggleBtnsVisability }));
      return { ...state, isGameBtnsVisible: toggleBtnsVisability };
    default:
      return state;
  }
};