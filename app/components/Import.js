// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import log from 'electron-log';

import ls from 'local-storage';

import ImportTable from './modules/ImportTable.js';

type Props = {};

export default class Import extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = { importString: '', imported: [] };
  }
  props: Props;

  /** Retieve imported from local-storage */
  getImported = bool => {
    var imports = [];
    if (ls.get('imports')) {
      imports = ls.get('imports');
      // log.info('LS: ' + imports);
      if (!bool) {
        return imports;
      }
    } else {
      if (!bool) {
        return [];
      }
    }
    if (bool) {
      this.setStateImported(imports);
    }
  };

  /** Update state wih imported */
  setStateImported = imported => {
    imported = imported.push(this.state.imported);
    this.setState({ imported: imported });
  };

  //** For clicking Import Button event */
  saveImportString = e => {
    //TODO ERROR CHECKING FOR VALID SIMC STRING
    // console.log(e);
    var imports = [];
    if (ls.get('imports')) {
      imports = ls.get('imports');
      // log.info(imports);
    }

    if (this.state.importString) {
      imports.push({
        key: this.generateId(),
        string: this.state.importString
      });
      // log.info(imports);

      //Save to local-storage
      ls.set('imports', imports);
    } else {
      //todo Display notification component, i.e like the one planned for header
    }
    this.setState({ importString: '' });
  };

  /**
   * CBA installing uuid from npm for such a small task
   * https://gist.github.com/gordonbrander/2230317
   * supposedly manages 10 milion ids generated with 0 collisions
   */
  generateId = function() {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  //** For onChange even on text-area */
  updateImportString = e => {
    this.setState({
      importString: e.target.value
    });
  };

  render() {
    return (
      <section id="import" className={'container'} data-tid="container">
        <h2 class="padding-left-20">Import</h2>
        <div class="input-container">
          <textarea
            value={this.state.importString}
            onChange={e => this.updateImportString(e)}
            class="form-control"
            id="importInput"
            rows="10"
          />
          <button
            onClick={e => this.saveImportString(e)}
            type="button"
            class="btn btn-lg btn-block background-colour-accent font-weight-bold"
          >
            Import
          </button>
        </div>
        <ImportTable imports={this.getImported()} />
      </section>
    );
  }
  componentDidMount() {
    log.info('Component Did Mount.');
  }
  componentDidUpdate() {
    log.info('Component Did Update.');
  }
  componentWillUnmount() {
    log.info('Component Will Unmount.');
  }
}
