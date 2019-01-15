// @flow
import type { GetState, Dispatch } from '../reducers/types';

import fs from 'fs';

import generateId from '../modules/GenerateId';

import log from 'electron-log';

export const GET_GEAR = 'Gets gear to display';
export const SELECT_GEAR = 'Selects a piece of gear for comparison';
export const GET_DIR = 'Gets dir contents';

export const getGear = gear => {
  return {
    gear: gear,
    type: GET_GEAR
  };
};

export const selectGear = () => {};
export const getDir = () => {};

export const getGearAsync = () => {
  return (dispatch: Dispatch) => {
    var file = 'equippable-items.json';
    //!look into JSON stream as predictably 60MB is too large a file to handle with React/Redux
    var path = __dirname + '\\tmp\\' + file;
    dispatch(getGear(JSON.parse(fs.readFileSync(path))));
  };
};
