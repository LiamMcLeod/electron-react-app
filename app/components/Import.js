// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import log from 'electron-log';

import ls from 'local-storage';

import ReturnButton from './modules/ReturnButton.js';
import ImportTable from './modules/ImportTable.js';

type Props = {};

export default class Import extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {
      importString: '',
      imported: []
    };
  }
  props: Props;

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

  setStateImported = imported => {
    // log.info('Imports:' + imported);
    imported = imported.push(this.state.imported);
    this.setState({
      imported: imported
    });
    log.info('State:' + this.state.imported);
  };

  //** For clicking Import Button event */
  saveImportString = e => {
    // console.log(e);
    var imports = [];
    if (ls.get('imports')) {
      imports = ls.get('imports');
      log.info(imports);
    }

    imports.push(this.state.importString);
    log.info(imports);

    //Save to local-storage
    ls.set('imports', imports);
    this.setState({ importString: '' });
  };

  //** For onChange even on text-area */
  updateImportString = e => {
    this.setState({
      importString: e.target.value
    });
    console.log(this.state.importString);
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
        <div id="imports-table" class="padding-top-40">
          {/* {log.info(this.props.imports)} */}
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col" colSpan="2" />
                <th scope="col">Name</th>
                <th scope="col">Server</th>
                <th scope="col">Region</th>
                <th scope="col" colSpan="2" />
              </tr>
            </thead>
            <ImportTable imports={this.getImported()} />
          </table>
        </div>
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
