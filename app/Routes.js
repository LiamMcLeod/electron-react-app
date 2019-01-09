import React from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import routes from './constants/routes';
import Nav from './containers/templates/Nav';
import Footer from './containers/templates/Footer';
import App from './containers/App';
import HomePage from './containers/HomePage';
import QuickSimPage from './containers/QuickSimPage';
import ImportPage from './containers/ImportPage';
import SimulatingPage from './containers/SimulatingPage';
import ResultsPage from './containers/ResultsPage';

import ReturnButton from './components/modules/ReturnButton';
export default class Routes extends React.Component<Props> {
  props: Props;
  state = { returnHidden: true };
  //** Return Button States */
  handleReturn(bool) {
    if (bool) {
      this.setState({ returnHidden: bool });
    } else {
      this.setState({ returnHidden: true });
    }
  }

  render() {
    var path = { location }.location.hash;
    var isHome = path == '#/';
    return (
      <div id="wrapper">
        <Nav />
        <main>
          {!isHome && <ReturnButton />}
          <App>
            <Switch>
              {/* HOME COMPONENT */}
              <Route exact path={routes.HOME} component={HomePage} />
              {/* MISC COMPONENTS */}
              <Route path={routes.IMPORT} component={ImportPage} />
              <Route path={routes.QUICKSIM} component={QuickSimPage} />
              <Route path={routes.RUNNING} component={SimulatingPage} />
              <Route path={routes.RESULTS} component={ResultsPage} />
            </Switch>
          </App>
        </main>
        <Footer />
      </div>
    );
  }
}
