// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import generateId from '../modules/GenerateId';

import log from 'electron-log';

type Props = {
  getId: () => void,
  profiles: String,
  id: String
};

export default class Result extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {
      id: ''
    };
  }
  props: Props;

  componentDidMount() {
    const { getId } = this.props;
    getId();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.profiles) {
      return { id: nextProps.profiles };
    } else return null;
  }

  render() {
    const { getId } = this.props;
    // log.info(profiles);
    return (
      <section id="sim-results" className="container" data-tid="container">
        <h2 className="padding-left-20">Results</h2>
        <button className="btn background-colour-accent font-weight-bold">
          Export
        </button>
      </section>
    );
  }
}
