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
  getDir: () => void,
  id: String
};

export default class Result extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = {
      id: '',
      result: '',
      results: '',
      readFlag: false
    };
  }
  props: Props;

  // readDir = () => {
  //   const path = __dirname + '\\tmp\\sims\\';
  //   var files = new Promise(resolve => {
  //     fs.readdir(path, (err, files) => {
  //       // log.info(files);
  //       resolve(files);
  //     });
  //   }).then(files => {
  //     this.setState({ results: files });
  //     return files;
  //   });
  //   return files;
  // };

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
    // const { getId, getFile, getDirAsync } = this.props;
    // getDirAsync();
    // this.readDir();
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
    //TODO UNCOMMENT IF FUCK UP
    // if (!this.state.id) {
    // var sims = [];
    // var sim = '';
    // if (ls.get('sims')) {
    // sims = ls.get('sims');
    // sim = sims.pop();
    //
    // this.setState({ id: sim });
    // if (!this.state.readFlag) {
    // this.setState({ readFlag: true });
    // this.readFile(sim);
    // }
    // }
    // } else {
    // var sim = this.state.id;
    // if (ls.get('sims')) {
    // sims = ls.get('sims');
    // sims.push(sim);
    // } else {
    // sims = [sim];
    // }
    //
    // ls.set('sims', sims);
    // if (!this.state.readFlag) {
    // this.setState({ readFlag: true });
    // this.readFile(this.state.id);
    // }
    // }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // log.info(nextProps);
    if (nextProps.id) {
      return { id: nextProps.id };
    }
    if (nextProps.file) {
      return { result: nextProps.file };
    }
    if (nextProps.files) {
      return { results: nextProps.files };
    } else return null;
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
