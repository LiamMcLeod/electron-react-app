// @flow

import { STORE_ID } from '../actions/profile';
import {
  GET_ID,
  GET_FILE,
  GET_DIR,
  DELETE_FILE,
  SELECT_FILE
} from '../actions/file';
import getFileAsync from '../modules/GetFiles';

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
      return { id: action.id, file: action.file };
    case GET_DIR:
      var files = [];
      for (var i = 0; i < action.files.length; i++) {
        getFileAsync(action.files[i], file => {
          // log.info(file);
          files.push(file);
        });
        files.sort(function(objA, objB) {
          return objB.data.timestamp - objA.data.timestamp;
        });
      }
      return { id: action.id, file: {}, files: files };
    case DELETE_FILE:
      var path = __dirname + '\\tmp\\sims\\' + action.id;
      fs.unlink(path, err => {
        if (err) throw err;
        // console.log('Deleted: ' + action.id);
      });
      return { id: '', file: {}, files: action.files };
    case SELECT_FILE:
      var i = action.files.findIndex(o => o.key === action.id);
      return { id: '', file: action.files[i], files: action.files };
    default:
      return state;
  }
}
