// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import ReturnButton from './modules/ReturnButton.js';
import ImportTable from './modules/ImportTable.js';

type Props = {};

export default class Import extends Component<Props> {
  props: Props;

  render() {
    return (
      <section id="import" className={'container'} data-tid="container">
        <h2 class="padding-left-20">Import</h2>
        <div class="input-container">
          <textarea class="form-control" id="importInput" rows="10" />
          <button
            type="button"
            class="btn btn-lg btn-block background-colour-accent font-weight-bold"
          >
            Import
          </button>
        </div>
        <ImportTable />
      </section>
    );
  }
}
