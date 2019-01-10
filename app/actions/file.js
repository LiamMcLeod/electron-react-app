// @flow
import type { GetState, Dispatch } from '../reducers/types';
import generateId from '../modules/GenerateId';

import log from 'electron-log';

export const STORE_ID = 'Stores a file ID to later display results for';
export const GET_ID = 'Gets a file ID to display results for';

var fileId = '';

export const storeId = id => {
  fileId = id;
  return {
    id: id,
    type: STORE_ID
  };
};

export const getId = () => {
  return {
    id: fileId,
    type: GET_ID
  };
};
