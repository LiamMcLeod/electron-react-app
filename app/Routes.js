import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import QuickSimPage from './containers/QuickSimPage';
import ImportPage from './containers/ImportPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.QUICKSIM} component={QuickSimPage} />
      <Route path={routes.IMPORT} component={ImportPage} />
      {/*! MUST BE LAST ?? */}
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
