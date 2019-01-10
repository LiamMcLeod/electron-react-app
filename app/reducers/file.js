// @flow

import { STORE_ID } from '../actions/profile';
import { GET_ID } from '../actions/file';
import type { Action } from './types';

import ls from 'local-storage';

import log from 'electron-log';

export default function profile(state = [], action) {
  switch (action.type) {
    case STORE_ID:
      return action.id;
    case GET_ID:
      return action.id;
    default:
      return state;
  }
}
