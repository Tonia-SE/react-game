import { SET_MUSIC_VOLUME, SET_SOUNDS_VOLUME } from './actionTypes';

export interface ISoundsState {
  musicVolume: number;
  soundsVolume: number;
}

interface ISoundsAction {
  type: string;
  musicVolume?: number;
  soundsVolume?: number;
}

let initialState: ISoundsState = {
  musicVolume: 0,
  soundsVolume: 0,
};

const savedSoundsState = localStorage.getItem('soundsState');
if (savedSoundsState !== null) {
  initialState = JSON.parse(savedSoundsState);
}

export type DispatchGame = (args: ISoundsAction) => ISoundsAction;

export const soundsReducer = (state: ISoundsState = initialState, action: ISoundsAction) => {
  switch (action.type) {
    case SET_SOUNDS_VOLUME:
      const soundsVolume = action.soundsVolume / 100;
      localStorage.setItem('soundsState', JSON.stringify({ ...state, soundsVolume: soundsVolume }));
      return { ...state, soundsVolume: soundsVolume };
    case SET_MUSIC_VOLUME:
      const musicVolume = action.musicVolume / 100;
      localStorage.setItem('soundsState', JSON.stringify({ ...state, musicVolume: musicVolume }));
      return { ...state, musicVolume: musicVolume };
    default:
      return state;
  }
};
