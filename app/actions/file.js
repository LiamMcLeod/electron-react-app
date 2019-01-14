// @flow
import type { GetState, Dispatch } from '../reducers/types';

import fs from 'fs';

import generateId from '../modules/GenerateId';

import log from 'electron-log';

export const STORE_ID = 'Stores a file ID to later display results for';
export const GET_ID = 'Gets a file ID to display results for';
export const GET_FILE = 'Gets a file using ID to display results for';
export const GET_DIR = 'Gets a sims dir to get results to display';
export const SELECT_FILE = 'Selects a result for displaying';
export const DELETE_FILE = 'Deletes a result displayed result';

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

export const getFile = (id, file) => {
  return {
    id: id,
    file: file,
    type: GET_FILE
  };
};

export const selectFile = (id, files) => {
  return {
    id: id,
    files: files,
    type: SELECT_FILE
  };
};

export const deleteFile = (id, files) => {
  return {
    id: id,
    files: files,
    type: DELETE_FILE
  };
};

export const getDir = files => {
  return {
    files: files,
    type: GET_DIR
  };
};

export const getFileAsync = id => {
  return (dispatch: Dispatch) => {
    var path = __dirname + '\\tmp\\sims\\' + id;
    dispatch(getFile(id, JSON.parse(fs.readFileSync(path))));
  };
};

export const getDirAsync = () => {
  return (dispatch: Dispatch) => {
    const path = __dirname + '\\tmp\\sims\\';
    fs.readdir(path, (err, files) => {
      dispatch(getDir(files));
    });
  };
};
