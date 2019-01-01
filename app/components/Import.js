// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {};

export default class Import extends Component<Props> {
  props: Props;

  render() {
    return (
      <section id="import" className={'container'} data-tid="container">
        <h2>Import</h2>
        <div class="input-container">
          <textarea class="form-control" id="importInput" rows="10" />
          <button
            type="button"
            class="btn btn-lg btn-block background-colour-accent"
          >
            Import
          </button>
        </div>
      </section>
    );
  }
}
