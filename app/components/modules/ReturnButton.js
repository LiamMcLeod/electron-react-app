// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

type Props = {};

export default class Import extends Component<Props> {
  props: Props;

  render() {
    return (
      <div
        className={
          'padding-left-20 padding-top-20 padding-bottom-20 inline-flex'
        }
      >
        <Link to={routes.HOME}>
          <button
            type="button"
            className="btn background-colour-accent font-weight-bold"
          >
            &#8629; Return
          </button>
        </Link>
      </div>
    );
  }
}
