// @flow
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import routes from '../constants/routes';

const fs = require('fs');
var spawn = require('child_process').spawn;

import generateId from '../modules/GenerateId';

import log from 'electron-log';

type Props = {};

export default class QuickSim extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {};
  }
  props: Props;

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }
  updateCharacterName = e => {
    this.setState({
      characterName: e.target.value
    });
  };
  updateServerName = e => {
    this.setState({ serverName: e.target.value });
  };
  updateRegion = e => {
    this.setState({ regionISO: e.target.value });
  };
  updateOutput = e => {
    this.setState({ output: e.target.value });
  };

  render() {
    return (
      <section id="armory-import" className="container" data-tid="container">
        <div className="input-group">
          <input
            value={this.state.characterName}
            onChange={e => this.updateCharacterName(e)}
            placeholder="Character Name"
            className="form-control dark-input"
          />
          <input
            value={this.state.serverName}
            onChange={e => this.updateServerName(e)}
            placeholder="Server Name"
            className="form-control dark-input"
          />
          <select
            value={this.state.regionISO}
            onChange={e => this.updateRegion(e)}
            className="form-control dark-input"
          >
            <option value="EU">EU</option>
            <option value="US">US</option>
          </select>
        </div>
      </section>
    );
  }

  componentWillUnmount() {
    this.setState = () => {};
  }
}
