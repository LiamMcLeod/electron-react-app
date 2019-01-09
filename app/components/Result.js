// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import generateId from '../modules/GenerateId';

import log from 'electron-log';

type Props = {
  getAllProfiles: () => void,
  deleteProfile: () => void,
  selectProfile: () => void,
  profiles: Array,
  selected: String
};

export default class Result extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {};
  }
  props: Props;

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  render() {
    const { deleteProfile, selectProfile, profiles } = this.props;
    // log.info(profiles);
    return (
      <section id="quick-sim" className="container" data-tid="container">
        <h2 className="padding-left-20">Results</h2>
      </section>
    );
    i;
  }
}
