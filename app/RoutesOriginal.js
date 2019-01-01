import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import Nav from './containers/templates/Nav';
import Footer from './containers/templates/Footer';
import App from './containers/App';
import HomePage from './containers/HomePage';
import QuickSimPage from './containers/QuickSimPage';
import ImportPage from './containers/ImportPage';
import ReturnButton from './components/modules/ReturnButton';

export default () => (
  <div id="wrapper">
    <Nav />
    <main>
      {/* isHome="" PROP FOR BELOW */}
      {/* {this.state.hide && <ReturnButton />} */}
      <App>
        <Switch>
          <Route path={routes.QUICKSIM} component={QuickSimPage} />
          <Route path={routes.IMPORT} component={ImportPage} />
          {/*! MUST BE LAST ?? */}
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </App>
    </main>
    <Footer />
  </div>
);
