import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { rootReducer } from './store/rootReducer';
import { Main } from './Main';
import { BestResultsPage } from './components/Pages/BestResultsPage/BestResultsPage';
import { HowToPlayPage } from './components/Pages/HowToPlayPage/HowToPlayPage';
import { SettingsPage } from './components/Pages/SettingsPage/SettingsPage';
import { AutoPlayPage } from './components/Pages/AutoPlayPage/AutoPlayPage';
import { translations } from './translations';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, compose(applyMiddleware(thunk), composeEnhancers()));

export const musicPlayer: HTMLAudioElement = new Audio('./assets/sounds/music.mp3');
export const buttonSoundsPlayer: HTMLAudioElement = new Audio('./assets/sounds/btn_sound.mp3');

export const winPlayer: HTMLAudioElement = new Audio('./assets/sounds/win_sound.mp3');
export const failPlayer: HTMLAudioElement = new Audio('./assets/sounds/fail_sound.mp3');

function handleAutoplay() {
  musicPlayer.play();
  removeEventListener('click', handleAutoplay);
}
document.addEventListener('click', handleAutoplay);

i18n.use(initReactI18next).init({
  resources: translations,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const routing = (
  <Router>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/best_results" component={BestResultsPage} />
        <Route exact path="/how_to_play" component={HowToPlayPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/autoplay" component={AutoPlayPage} />
      </Switch>
    </Provider>
  </Router>
);
render(routing, document.querySelector('#root'));
