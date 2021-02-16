import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Main } from './Main';
import { rootReducer } from './store/rootReducer';

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
        </Switch>
      </div>
    </Provider>
  </Router>
);
render(routing, document.querySelector('#root'));
