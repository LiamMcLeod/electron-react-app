// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import ls from 'local-storage';

import generateId from '../modules/GenerateId';

import log from 'electron-log';

type Props = {
  getId: () => void,
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
    //TODO THIS IS A QUICK AND DIRTY TEMPORARY FIX. LATER I WILL ADD A RESULTS PAGE WITH ALL CATALOGUED RESULTS
    const { getId } = this.props;
    // getId();
    if (!this.state.id) {
      var sims = [];
      var sim = '';
      if (ls.get('sims')) {
        sims = ls.get('sims');
        sim = sims.pop();

        this.setState({ id: sim });
      }
    } else {
      var sim = this.state.id;
      if (ls.get('sims')) {
        sims = ls.get('sims');
        sims.push(sim);
      } else {
        sims = [sim];
      }

      ls.set('sims', sims);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // log.info(nextProps);
    if (nextProps.id) {
      return { id: nextProps.id };
    } else return null;
  }

  render() {
    const { getId } = this.props;
    log.info(this.state.id);
    return (
      <section id="sim-results" className="container" data-tid="container">
        <h2 className="padding-left-20">Results</h2>
        {this.state.id}
        <button className="btn background-colour-accent font-weight-bold">
          Export
        </button>
      </section>
    );
  }
}
