// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

//* Import SVGs
import Boot from './svgs/Boot.js';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <section
        id="home"
        className={styles.container + ' container'}
        data-tid="container"
      >
        {/** ROW ONE  */}
        <div className="row">
          {/** Import */}
          <div className="col-6">
            <div className={styles.itemBounds} data-tid="container">
              <Link to={routes.IMPORT} className="item-link" href="#">
                <div className="home-item">
                  <div className="item-image">
                    <Boot />
                  </div>
                  <div className="item-text">
                    <h2 className="heading">Import</h2>
                    <p className="description">Import a Simc output.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/** Quick Sim */}
          <div className="col-6">
            <div className={styles.itemBounds} data-tid="container">
              <Link to={routes.QUICKSIM} className="item-link" href="#">
                <div className="home-item">
                  <div className="item-image">
                    <Boot />
                  </div>
                  <div className="item-text">
                    <h2 className="heading">Quick Sim</h2>
                    <p className="description">
                      Run a quick sim to get your current DPS.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/** OTHER */}
          <div className="col-6">
            <div className={styles.itemBounds} data-tid="container">
              <Link to={routes.COMPARE} className="item-link" href="#">
                <div className="home-item">
                  <div className="item-image">
                    <Boot />
                  </div>
                  <div className="item-text">
                    <h2 className="heading">Gear Compare</h2>
                    <p className="description">
                      Compare different sets of gear
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/** Results */}
          <div className="col-6">
            <div className={styles.itemBounds} data-tid="container">
              <Link to={routes.RESULTS} className="item-link" href="#">
                <div className="home-item">
                  <div className="item-image">
                    <Boot />
                  </div>
                  <div className="item-text">
                    <h2 className="heading">Results</h2>
                    <p className="description">Check historic results</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/*! <Link to={routes.COUNTER}>to Counter</Link> */}
      </section>
    );
  }
}
