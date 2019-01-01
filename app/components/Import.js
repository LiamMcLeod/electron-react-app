// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {};

export default class Import extends Component<Props> {
  props: Props;

  render() {
    return(
      <section id="import" data-tid="container">
        <p><Link to={routes.HOME}>Return</Link></p>
        <h2>Import</h2>
      </section>
    )
  }
}
