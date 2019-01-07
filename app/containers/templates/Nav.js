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
      <nav className="navbar">
        <div className="container">
          <ul className="nav">
            <li>
              <Link className="navbar-brand" to={routes.HOME}>
                Electron Simcraft
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={routes.HOME}>
                Home
              </Link>
            </li>
          </ul>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to={routes.IMPORT}>
                Import
              </Link>
            </li>
            <li className="nav-item">
              {/* TODO */}
              <Link className="nav-link" to={routes.IMPORT}>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
