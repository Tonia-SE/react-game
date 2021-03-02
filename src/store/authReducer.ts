import { backendServer } from '../consts';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, RESET_FAILED_ATTEMPT, SHOW_LOADER } from './actionTypes';


export interface IAuthState {
  isRegristred?: boolean;
  userName: string;
  isLoggedIn: boolean;
  isFailedAttempt?: boolean;
}

interface IAuthAction {
  type: string;
  payload: {
    userName: string;
    isLoggedIn: boolean;
    isRegristred?: boolean;
    isFailedAttempt?: boolean;
  };
}

export type DispatchAuth = (args: IAuthAction) => IAuthAction;

const initialState: IAuthState = {
  userName: '',
  isLoggedIn: false,
  isRegristred: false,
  isFailedAttempt: false,
};

let authState = { ...initialState };
const savedState = localStorage.getItem('authstate');
if (savedState !== null) {
  authState = JSON.parse(savedState);
}

export const authReducer = (state: IAuthState = authState, action: IAuthAction) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem('authstate', JSON.stringify(action.payload));
      return { ...action.payload };
    case LOGOUT_USER:
      localStorage.removeItem('authstate');
      return { ...initialState };
    case REGISTER_USER:
      return { ...action.payload };
    case RESET_FAILED_ATTEMPT:
      localStorage.setItem('authstate', JSON.stringify({ ...state, isFailedAttempt: false }));
      return { ...state, isFailedAttempt: false };
    default:
      return state;
  }
};

export function loginUser(user: string, password: string) {
  return async (dispatch: any) => {
    let isLoggendIn = false;
    let isFailedLogin = false;
    try {
      dispatch({ type: SHOW_LOADER, payload: undefined, isLoading: true });
      const data = btoa(JSON.stringify({ user: user, password: password }));
      const response = await fetch(`${backendServer}/auth/login`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({ data: data }),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      if (response.status === 200) {
        isLoggendIn = true;
        isFailedLogin = false;
      } else {
        isFailedLogin = true;
      }
      dispatch({
        type: LOGIN_USER,
        payload: {
          userName: user,
          isLoggedIn: isLoggendIn,
          isFailedAttempt: isFailedLogin,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function regUser(user: string, password: string) {
  return async (dispatch: any) => {
    let isRegistred = false;
    let isFailedAttempt = false;
    try {
      dispatch({ type: SHOW_LOADER, payload: undefined, isLoading: true });
      const data = btoa(JSON.stringify({ user: user, password: password }));
      const response = await fetch(`${backendServer}/auth/register`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({ data: data }),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      if (response.status === 200) {
        isRegistred = true;
      } else {
        isFailedAttempt = true;
      }
      dispatch({
        type: REGISTER_USER,
        payload: {
          userName: user,
          isLoggedIn: false,
          isRegristred: isRegistred,
          isFailedAttempt: isFailedAttempt,
        },
      });
    } catch (e) {
    }
  };
}
