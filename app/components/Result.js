// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import fs from 'fs';
import ls from 'local-storage';

import generateId from '../modules/GenerateId';

import log from 'electron-log';

type Props = {
  getId: () => void,
  getFile: () => void,
  // getDir: () => void,
  getDirAsync: () => void,
  id: String,
  result: Object,
  results: Array
};

export default class Result extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {
      id: '',
      result: {},
      results: [],
      readFlag: false
    };
  }
  props: Props;

  readFile = id => {
    const path = __dirname + '\\tmp\\sims\\' + id;
    var results = '';
    var file = new Promise(resolve => {
      var readStream = fs.createReadStream(path);
      readStream
        .on('open', () => {
          //pipe to result
          // log.info('Open');
          // readStream.pipe(result);
        })
        .on('data', data => {
          // log.info('Chunk: ' + data);
          file = data += data;
        })
        .on('error', err => {
          throw err;
        })
        .on('end', () => {
          // log.info(results);
          resolve(file);
        });
    });
    this.setState({ result: file });
    return file;
  };

  componentDidMount() {
    const { getId, getFile, getDirAsync } = this.props;
    getDirAsync();
    //TODO THIS IS A QUICK AND DIRTY TEMPORARY FIX. LATER I WILL ADD A RESULTS PAGE WITH ALL CATALOGUED RESULTS
    // getId();
    // if (!this.state.id) {
    //   var sims = [];
    //   var sim = '';
    //   if (this.state.results) {
    //     sims = this.state.results;
    //     // log.info(sim);
    //     sim = sims.pop();
    //     this.setState({ id: sim });
    //     if (!this.state.readFlag) {
    //       this.setState({ readFlag: true });
    //       this.readFile(sim);
    //     }
    //   }
    // }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    log.info(nextProps);
    // log.info(nextProps.results);
    if (nextProps.id) {
      return { id: nextProps.id };
    }
    if (nextProps.result) {
      return { result: nextProps.result };
    }
    //! IF NOT BEING MET
    if (nextProps.results) {
      // TODO PROP ISN'T PARSING TO STATE
      log.info(nextProps.results);
      return { results: nextProps.results };
    }
    return null;
  }

  render() {
    const { getId, getFile, getDir } = this.props;
    // log.info(this.state.results);

    return (
      <section id="sim-results" className="container" data-tid="container">
        <h2 className="padding-left-20">Results</h2>
        {/* {this.state.id} */}
        <button className="btn background-colour-accent font-weight-bold">
          Export
        </button>
      </section>
    );
  }
}
