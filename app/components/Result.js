// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import fs from 'fs';
import ls from 'local-storage';

import ResultsTable from './modules/ResultsTable';
import CurrentResult from './modules/CurrentResult';

import generateId from '../modules/GenerateId';

import log from 'electron-log';

type Props = {
  getId: () => void,
  selectFile: () => void,
  // getFile: () => void,
  // getDir: () => void,
  getDirAsync: () => void,
  getFileAsync: () => void,
  deleteFile(): () => void,
  id: String,
  result: Object,
  results: Array
};

var firstPass = true;

export default class Result extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {
      id: '',
      result: {},
      results: [],
      readFlag: false,
      showResult: false
    };
  }
  props: Props;

  setSelected = selected => {
    const { getFileAsync } = this.props;
    getFileAsync(selected);
    this.setState({ showResult: true });
    this.setState({ id: selected });
    // getFileAsync(selected, () => {
    //   this.setState({ id: selected });
    // })
  };

  componentDidMount() {
    const { getDirAsync } = this.props;
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
    // log.info(nextProps);
    if (nextProps.id && nextProps.result && nextProps.results) {
      return {
        id: nextProps.id,
        result: nextProps.result,
        results: nextProps.results
      };
    }
    if (nextProps.id && nextProps.result) {
      return { id: nextProps.id, result: nextProps.result };
    }
    if (firstPass) {
      firstPass = false;
      if (nextProps.id) {
        return { id: nextProps.id };
      }
      if (nextProps.result) {
        return { result: nextProps.result };
      }
      return null;
    } else {
      if (nextProps.results) {
        // log.info(nextProps.results);
        return { results: nextProps.results };
      }
      return null;
    }
    return null;
  }

  render() {
    const { getId, getDir, selectFile } = this.props;
    // log.info(this.state.results);
    return (
      <section id="sim-results" className="container" data-tid="container">
        <h2 className="padding-left-20">Results</h2>
        {this.state.showResult ? (
          <CurrentResult id={this.state.id} json={this.state.result} />
        ) : null}
        <ResultsTable
          results={this.state.results}
          selectable={true}
          selectFile={selectFile}
          setSelected={this.setSelected}
          deleteFile={this.deleteFile}
        />
      </section>
    );
  }
}
