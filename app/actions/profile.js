// @flow
import type { GetState, Dispatch } from '../reducers/types';
import generateId from '../modules/GenerateId';

import log from 'electron-log';

export const GET_PROFILE = 'Retrieve a saved SimC profiles';
export const GET_ALL_PROFILES = 'Retrieve all saved SimC profiles';
export const POST_PROFILE = 'Save a submitted SimC profile';
export const DELETE_PROFILE = 'Delete a submitted SimC profile';
export const SELECT_PROFILE = 'Selects a submitted SimC profile';
export const STORE_ID = 'Stores a file ID to later display results for';
export const GET_ID = 'Gets a file ID to display results for';
export const SET_PROFILE = "React's setSate with profiles";

var fileId = '';

//! Actions describe events and deliver a payload but nothing else

export const getProfile = key => {
  return {
    key: key,
    type: GET_PROFILE
  };
};

export const getAllProfiles = () => {
  return {
    type: GET_ALL_PROFILES,
    profiles: Array
  };
};

export const postProfile = (e, string) => {
  // e.preventDefault();
  return {
    key: generateId(),
    type: POST_PROFILE,
    string: string
  };
};

export const deleteProfile = (e, key) => {
  // e.preventDefault();
  return {
    key: key,
    type: DELETE_PROFILE
  };
};

export const selectProfile = key => {
  // e.preventDefault();
  return {
    key: key,
    type: SELECT_PROFILE
  };
};

export const storeId = id => {
  fileId = id;
  return {
    id: id,
    type: STORE_ID
  };
};

export const getId = id => {
  return {
    id: fileId,
    type: GET_ID
  };
};

export const setProfile = () => {
  return {
    type: SET_PROFILE
  };
};
