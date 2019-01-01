// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

import Boot from './svgs/Boot.js';


type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <section id="home" className={""+ styles.container + ""} data-tid="container">
        {/** ROW ONE  */}
        <div class="row">
          <div class="col-6">
            <div className={styles.itemBounds} data-tid="container">
              <Link to={routes.IMPORT} class="item-link" href="#">
                <div class="home-item">
                  <div class="item-image">
                     <Boot/>
                  </div>
                  <div class="item-text"> 
                    <h2 class="heading">Import</h2>
                    <p class="description">Import a Simc output.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div class="col-6">
            <div className={styles.itemBounds} data-tid="container">
              <Link to={routes.QUICKSIM} class="item-link" href="#">
                <div class="home-item">
                  <div class="item-image">
                     <Boot/>
                  </div>
                  <div class="item-text"> 
                    <h2 class="heading">Quick Sim</h2>
                    <p class="description">Run a quick sim to get your current DPS.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
      {/** OTHER */}
      </div>
      {/*! <Link to={routes.COUNTER}>to Counter</Link> */}
      </section>
    );
  }
}
