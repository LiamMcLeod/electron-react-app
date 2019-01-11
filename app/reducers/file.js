// @flow

import { STORE_ID } from '../actions/profile';
import { GET_ID, GET_FILE } from '../actions/file';
import type { Action } from './types';

import fs from 'fs';
import ls from 'local-storage';

import log from 'electron-log';

export default function file(state = [], action) {
  switch (action.type) {
    case STORE_ID:
      return action.id;
    case GET_ID:
      return action.id;
    case GET_FILE:
      var results = '';
      const path = __dirname + '\\tmp\\' + action.id + '.json';
      var file = new Promise(resolve => {
        var readStream = fs.createReadStream(path);
        readStream
          .on('open', () => {
            //pipe to result
            log.info('Open');
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
      return { id: action.id, file: file };
    default:
      return state;
  }
}

var readFile = path => {
  var file = new Promise(resolve => {
    var readStream = fs.createReadStream(path);
    readStream
      .on('open', () => {
        //pipe to result
        log.info('Open');
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
  return file;
};
