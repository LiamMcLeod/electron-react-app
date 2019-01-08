// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import log from 'electron-log';

import ImportTable from './modules/ImportTable.js';

type Props = {
  getAllProfiles: () => void,
  deleteProfile: () => void,
  selectProfile: () => void,
  profiles: Array,
  selected: String
};

export default class QuickSim extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = { profiles: [] };
  }
  props: Props;

  componentDidMount() {
    const { getAllProfiles, profiles } = this.props;
    getAllProfiles();
    // this.state.profiles = profiles;
    // this.setState({ profiles: profiles });
    log.info('Component Did Mount.');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.profiles) {
      return { profiles: nextProps.profiles };
    } else return null;
  }

  runSim = () => {
    const { selected } = this.props;
    log.info(selected);
    // if (selectProfile()) {
    //   //
    // }
  };

  render() {
    const { deleteProfile, selectProfile, profiles } = this.props;
    // log.info(profiles);
    return (
      <section id="quick-sim" className="container" data-tid="container">
        <h2 className="padding-left-20">QuickSim</h2>
        <button
          onClick={e => {
            this.runSim();
          }}
          type="button"
          className="btn btn-lg background-colour-accent font-weight-bold"
        >
          Run Sim
        </button>
        <ImportTable
          deleteProfile={deleteProfile}
          selectProfile={selectProfile}
          profiles={this.state.profiles}
          selectable={true}
        />
      </section>
    );
    i;
  }
}
