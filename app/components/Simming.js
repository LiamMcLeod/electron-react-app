// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import log from 'electron-log';

export default class Simming extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {
      output: ''
    };
  }
  props: Props;

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }
  updateOutput = e => {
    this.setState({ output: e.target.value });
  };
  render() {
    return (
      <section id="quick-sim" className="container" data-tid="container">
        <h2 className="padding-left-20">Simulating</h2>
        <textarea
          value={this.state.output}
          onChange={e => this.updateImportString(e)}
          className="form-control dark-textarea"
          rows="10"
        />
      </section>
    );
    i;
  }
}
