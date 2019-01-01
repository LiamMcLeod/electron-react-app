// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
// import styles from './Nav.css';

type Props = {};

export default class Nav extends Component<Props> {
  props: Props;

  render() {
    // TODO ADJUST LINKS
    return (
      <nav class="navbar">
        <div class="container">
          <ul class="nav">
            <li>
              <Link class="navbar-brand" to={routes.HOME}>
                Electron Simcraft
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to={routes.HOME}>
                Home
              </Link>
            </li>
          </ul>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <Link class="nav-link" to={routes.IMPORT}>
                Import
              </Link>
            </li>
            <li class="nav-item">
              {/* TODO */}
              <Link class="nav-link" to={routes.IMPORT}>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
