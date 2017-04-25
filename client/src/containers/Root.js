import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiConfig from './MuiConfig';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={MuiConfig} />
    </Router>
  </Provider>
);

export default Root;
