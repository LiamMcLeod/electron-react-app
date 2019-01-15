// @flow

import { STORE_ID } from '../actions/profile';
import { GET_GEAR, SELECT_GEAR, GET_DIR } from '../actions/gear';
// import getFileAsync from '../modules/GetFiles';

import type { Action } from './types';

import fs from 'fs';
import ls from 'local-storage';

import log from 'electron-log';

export default function gear(state = [], action) {
  switch (action.type) {
    case GET_GEAR:
      // log.info(action.gear);
      return action.gear;
    case SELECT_GEAR:
      return null;
    case GET_DIR:
      return null;
    default:
      return state;
  }
}
