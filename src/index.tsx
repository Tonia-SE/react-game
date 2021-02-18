import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { rootReducer } from './store/rootReducer';
import { Main } from './Main';
import { BestResultsPage } from './components/Pages/BestResultsPage/BestResultsPage';
import { HowToPlayPage } from './components/Pages/HowToPlayPage/HowToPlayPage';
import { SettingsPage } from './components/Pages/SettingsPage/SettingsPage';
import { AutoPlayPage } from './components/Pages/AutoPlayPage/AutoPlayPage';



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, compose(applyMiddleware(thunk), composeEnhancers()));

const routing = (
  <Router>
    <Provider store={store}>
      <div className="body">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/best_results" component={BestResultsPage} />
          <Route exact path="/how_to_play" component={HowToPlayPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/autoplay" component={AutoPlayPage} />
        </Switch>
      </div>
    </Provider>
  </Router>
);
render(routing, document.querySelector('#root'));
