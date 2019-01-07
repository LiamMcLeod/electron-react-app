// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import log from 'electron-log';

import ls from 'local-storage';

import ImportTable from './modules/ImportTable.js';

type Props = {
  getProfiles: () => void,
  getAllProfiles: () => void,
  postProfiles: () => void,
  setProfiles: () => void,
  profiles: Array
};

export default class Import extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = { importString: '', profiles: [] };
    //...
  }
  props: Props;

  //** For onChange even on text-area */
  updateImportString = e => {
    this.setState({
      importString: e.target.value
    });
  };

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
    }
  }
  componentDidUpdate(prevProps, prevState) {
    //EXAMPLE:
    // if (prevProps.someValue !== this.props.someValue) {
    //Perform some operation here
    // this.setState({ someState: someValue });
    // this.classMethod();
    // }
  }

  render() {
    const {
      getProfiles,
      getAllProfiles,
      postProfiles,
      setProfiles,
      profiles
    } = this.props;
    // log.info(profiles);
    return (
      <section id="import" className="container" data-tid="container">
        <h2 className="padding-left-20">Import</h2>
        <div className="input-container">
          <textarea
            value={this.state.importString}
            onChange={e => this.updateImportString(e)}
            className="form-control"
            id="importInput"
            rows="10"
          />
          <button
            onClick={e => {
              postProfiles(e, this.state.importString);
              this.setState({ importString: '' });
            }}
            type="button"
            className="btn btn-lg btn-block background-colour-accent font-weight-bold"
          >
            Import
          </button>
          {/* </button> <button onClick={e => this.saveImportString(e)} type="button" className="btn btn-lg btn-block background-colour-accent font-weight-bold">
            Import
          </button> */}
        </div>
        <ImportTable profiles={this.state.profiles} />
        {/* <ImportTable imports={this.state.profiles} /> */}
      </section>
    );
  }

  componentWillUnmount() {
    log.info('Component Will Unmount.');
  }
}
