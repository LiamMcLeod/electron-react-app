// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

type Props = {};

export default class Import extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <p>
          <Link to={routes.HOME}> &#8629; Return</Link>
        </p>
      </div>
    );
  }
}
