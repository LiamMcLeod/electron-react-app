// @flow

import { STORE_ID } from '../actions/profile';
import { GET_ID, GET_FILE, GET_DIR, SELECT_FILE } from '../actions/file';
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
      return { id: action.id, file: {}, files: action.files };
    case SELECT_FILE:
      var i = action.files.findIndex(o => o.key === action.id);
      return { id: '', file: action.files[i], files: action.files };
    default:
      return state;
  }
}
