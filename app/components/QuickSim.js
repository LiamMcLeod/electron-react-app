// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import generateId from '../modules/GenerateId';

var spawn = require('child_process').spawn;

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
    this.state = {
      profiles: [],
      characterName: '',
      serverName: '',
      regionISO: 'EU'
    };
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

  initSim = () => {
    const { selected } = this.props;
    // log.info(selected);
    if (
      this.state.characterName &&
      this.state.serverName &&
      this.state.regionISO
    ) {
      var armory = {
        character: this.state.characterName,
        server: this.state.serverName,
        region: this.state.regionISO
      };
      this.runSim(armory);
    } else {
      if (selected && selected.key) {
        log.info(selected.key);
        console.log(spawn);
        this.runSim(selected);
      }
    }
  };

  runSim = selected => {
    log.info(selected);
    var id = generateId();
    if (selected.character) {
      log.info(`${selected.region},${selected.server},${selected.character}`);
      var rep = new Promise(resolve => {
        switch (process.platform) {
          case 'win32':
            console.log('Detected Windows OS');
            console.log('Running test Simulation');
            log.info(__dirname);
            const simc = spawn('./simc/simc.exe', [
              'armory=' +
                `${selected.region},${selected.server},${selected.character}`,
              // __dirname + `\\tmp\\${id}.simc`,
              // 'calculate_scale_factors=0',
              'html=' + __dirname + `\\tmp\\${id}.html`
              // 'iterations=5000'
            ]);
            simc.stdout.on('data', data => {
              console.log(`stdout: ${data}`);
            });

            simc.stderr.on('data', data => {
              console.log(`stderr: ${data}`);
            });

            simc.on('close', () => resolve(true));
            break;
        }
      });
      return rep;
    } else {
      var rep = new Promise(resolve => {
        switch (process.platform) {
          case 'win32':
            console.log('Detected Windows OS');
            console.log('Running test Simulation');
            log.info(__dirname);
            const simc = spawn('./simc/simc.exe', [
              __dirname + `\\tmp\\${selected.key}.simc`,
              'calculate_scale_factors=0',
              'html=' + `\\reports\\${selected.key}.html`,
              'iterations=5000'
            ]);
            simc.stdout.on('data', data => {
              console.log(`stdout: ${data}`);
            });

            simc.stderr.on('data', data => {
              console.log(`stderr: ${data}`);
            });

            simc.on('close', () => resolve(true));
            break;
        }
      });
      return rep;
    }
  };
  updateCharacterName = e => {
    this.setState({ characterName: e.target.value });
  };
  updateServerName = e => {
    this.setState({ serverName: e.target.value });
  };
  updateRegion = e => {
    this.setState({ regionISO: e.target.value });
  };

  render() {
    const { deleteProfile, selectProfile, profiles } = this.props;
    // log.info(profiles);
    return (
      <section id="quick-sim" className="container" data-tid="container">
        <h2 className="padding-left-20">QuickSim</h2>
        <button
          onClick={e => {
            this.initSim();
          }}
          type="button"
          className="btn btn-lg background-colour-accent font-weight-bold"
        >
          Run Sim
        </button>
        <input
          value={this.state.characterName}
          onChange={e => this.updateCharacterName(e)}
          placeholder="Character Name"
          className="form-control"
        />
        <input
          value={this.state.serverName}
          onChange={e => this.updateServerName(e)}
          placeholder="Server Name"
          className="form-control"
        />
        <select
          value={this.state.regionISO}
          onChange={e => this.updateRegion(e)}
          className="custom-select"
        >
          <option id="region-placeholder" defaultValue disabled>
            - Region -
          </option>
          <option value="EU">EU</option>
          <option value="US">US</option>
        </select>
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
