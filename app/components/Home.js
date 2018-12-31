// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={"container flex "+ styles.container + ""} data-tid="container">
       <div class="col-6">
          <div class="home-item">

          </div>
        </div>
         <div class="col-6">
          <div class="home-item">

          </div>
        </div>
      </div>
      /* <Link to={routes.COUNTER}>to Counter</Link> */
    );
  }
}
