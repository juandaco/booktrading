import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Root from './containers/Root';
import './index.css';

const middleware = [thunk];

/*
  Add middleware based on enviroment if desired
*/
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }

/*
  For Redux Dev Tools in Chrome
*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*
  Explicit Hot Reloading Reducer (see https://github.com/reactjs/react-redux/releases/tag/v2.0.0)
*/
function configureStore() {
  const store = createStore(
    reducer,
    // For Redux Dev Tools and Middlware
    composeEnhancers(applyMiddleware(...middleware)),
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

render(
  <AppContainer>
    <Root store={configureStore()} />
  </AppContainer>,
  document.getElementById('root'),
);

/*
  Enabling Component Hot Reloading
*/
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
