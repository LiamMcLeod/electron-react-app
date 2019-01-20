// @flow
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import routes from '../constants/routes';

const fs = require('fs');
var spawn = require('child_process').spawn;

import generateId from '../modules/GenerateId';
import GearSelect from './modules/GearSelect';

import log from 'electron-log';

type Props = {
  getGearAsync: () => void,
  storeId: () => void
};

export default class GearCompare extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {
      gear: [],
      characterName: 'Tetrodotoxin',
      serverName: 'Kazzak',
      regionISO: 'EU',
      running: false,
      output: '',
      toResults: false,
      sets: 0
    };
  }
  props: Props;

  componentDidMount() {
    log.info('Component Did Mount.');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // log.info(nextProps);
    // if (nextProps.equippableGear) {
    //   return nextProps.equippableGear;
    // } else return null;
    return null;
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
      //TODO THIS x2,
      this.runSimAsyc(armory);
    } else {
      log.info('No selected');
    }
  };

  runSimAsyc = (selected, i) => {
    const { storeId } = this.props;
    var id = generateId();
    if (selected.character) {
      // log.info(`${selected.region},${selected.server},${selected.character}`);
      var rep = new Promise(resolve => {
        switch (process.platform) {
          case 'win32':
            log.info('Detected Windows OS');
            log.info('Running Simulation');
            //! the GC file PREFIX will denote quick sim so that I can use it later to determine that it was a quick sim
            const simc = spawn('./simc/simc.exe', [
              'armory=' +
                `${selected.region},${selected.server},${selected.character}`,
              'json2=' + __dirname + `\\tmp\\GC${id}_${i}.json`,
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
              log.info(`stderr: ${data}`);
              throw data;
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
  addGearSet = e => {
    this.setState({ sets: this.state.sets + 1 });
  };

  render() {
    var gearSelect = [];
    for (var i = 0; i < this.state.sets; i++) {
      gearSelect.push(
        <div key={generateId()}>
          <GearSelect />
        </div>
      );
    }
    var options = this.state.gear;
    if (this.state.toResults === true) {
      return <Redirect to="/sim/results" />;
    }
    if (!this.state.running) {
      return (
        <section id="gear-compare" className="container" data-tid="container">
          <h2 className="padding-left-20">Gear Compare</h2>
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
          <button
            onClick={e => {
              this.initSim();
            }}
            type="button"
            className="btn btn-lg background-colour-accent font-weight-bold"
          >
            Run Sim
          </button>
          <button
            onClick={e => {
              this.addGearSet(e);
            }}
            type="button"
            className="btn btn-lg background-colour-accent"
          >
            Add Set
          </button>
          {gearSelect}
          {/* <GearSelect /> */}
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
  componentWillUnmount() {
    this.setState = () => {};
  }
}
