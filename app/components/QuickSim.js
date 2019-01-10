// @flow
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import routes from '../constants/routes';

import generateId from '../modules/GenerateId';

var spawn = require('child_process').spawn;
const fs = require('fs');

import log from 'electron-log';

import ImportTable from './modules/ImportTable.js';

type Props = {
  getAllProfiles: () => void,
  deleteProfile: () => void,
  selectProfile: () => void,
  storeId: () => void,
  profiles: Array,
  selected: String
};

export default class QuickSim extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {
      profiles: [],
      characterName: 'Tetrodotoxin',
      serverName: 'Kazzak',
      regionISO: 'EU', // process: 'quicksim', //!Change //!Change
      running: false,
      output: '',
      toResults: false
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
      this.setState({ running: true });
      this.runSimAsyc(armory);
      // var runSim = new Promise(resolve => {
      //   var id = this.runSim(armory);
      //   // while (!id) {}
      //   resolve(id);
      // }).then(id => {
      //   if (fs.existsSync(__dirname + `\\tmp\\${id}.json`)) {
      //     log.info('File Found.');
      //   } else {
      //     log.info('Not found');
      //   }
      // });
    } else {
      if (selected && selected.key) {
        // log.info(selected.key);
        this.runSim(selected);
      }
    }
  };

  // runSim = selected => {
  //   var id = generateId();
  //   if (selected.character) {
  //     switch (process.platform) {
  //       case 'win32':
  //         log.info('Detected Windows OS');
  //         log.info('Running Simulation');
  //         const simc = spawn('./simc/simc.exe', [
  //           'armory=' +
  //             `${selected.region},${selected.server},${selected.character}`,
  //           'json2=' + __dirname + `\\tmp\\${id}.json`,
  //           'iterations=10000'
  //           // 'calculate_scale_factors=0',
  //           // 'output=' + __dirname + `\\tmp\\${id}.txt`,
  //           // 'xml=' + __dirname + `\\tmp\\${id}.xml`,
  //           // 'html=' + __dirname + `\\tmp\\${id}.html`
  //         ]);
  //         simc.stdout.on('data', data => {
  //           this.setState({ output: this.state.output + '\n' + data });
  //           log.info(`stdout: ${data}`);
  //         });
  //         simc.stderr.on('data', data => {
  //           this.setState({ output: data });
  //           log.info(`stderr: ${data}`);
  //         });
  //         simc.on('close', id => {
  //           this.setState({ toResults: true });
  //           return id;
  //         });
  //         break;
  //       default:
  //         log.info('Platform not supported.');
  //         break;
  //     }
  //     return id;
  //   }
  // };

  runSimAsyc = selected => {
    const { storeId } = this.props;
    var id = generateId();
    if (selected.character) {
      // log.info(`${selected.region},${selected.server},${selected.character}`);
      var rep = new Promise(resolve => {
        switch (process.platform) {
          case 'win32':
            log.info('Detected Windows OS');
            log.info('Running Simulation');
            const simc = spawn('./simc/simc.exe', [
              'armory=' +
                `${selected.region},${selected.server},${selected.character}`,
              'json2=' + __dirname + `\\tmp\\${id}.json`,
              'iterations=10000'
              // 'calculate_scale_factors=0',
              // 'output=' + __dirname + `\\tmp\\${id}.txt`,
              // 'xml=' + __dirname + `\\tmp\\${id}.xml`,
              // 'html=' + __dirname + `\\tmp\\${id}.html`
            ]);
            simc.stdout.on('data', data => {
              this.setState({
                output: data + '\n' + this.state.output
              });
              // log.info(`stdout: ${data}`);
            });
            simc.stderr.on('data', data => {
              this.setState({
                output: data + '\n' + this.state.output
              });
              // log.info(`stderr: ${data}`);
            });
            simc.on('close', id => {
              this.setState({ toResults: true });
              // storeId(id);
              return id;
            });
            break;
          default:
            log.info('Platform not supported.');
            break;
        }
        storeId(id);
        return id;
      }).then(id => {
        // log.info(rep, id);
        return id;
      });
    }
  };

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
    const { deleteProfile, selectProfile, profiles } = this.props;
    // log.info(profiles);
    if (this.state.toResults === true) {
      return <Redirect to="/sim/results" />;
    }
    if (!this.state.running) {
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
    } else {
      return (
        <section id="quick-sim" className="container" data-tid="container">
          <h2 className="padding-left-20">Simulating</h2>
          <textarea
            value={this.state.output}
            onChange={e => this.updateOutput(e)}
            className="form-control dark-textarea"
            rows="10"
          />
        </section>
      );
    }
  }
}
