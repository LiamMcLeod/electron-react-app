// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {};

export default class QuickSim extends Component<Props> {
  props: Props;

  render() {
    return (
      <section id="quick-sim" className={'container'} data-tid="container">
        <div>
          {/* <form> */}
          <label>Region</label>
          <select>
            <option>EU </option>
            <option>US</option>
          </select>
          Realm
          <input />
          Character
          <input />
          {/* </form> */}
        </div>
      </section>
    );
  }
}
