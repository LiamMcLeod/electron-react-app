// @flow
import type { GetState, Dispatch } from '../reducers/types';
import generateId from '../modules/GenerateId';

import log from 'electron-log';

export const GET_PROFILE = 'Retrieve a saved SimC profiles';
export const GET_ALL_PROFILES = 'Retrieve all saved SimC profiles';
export const POST_PROFILE = 'Save submitted SimC profiles';
export const DELETE_PROFILE = 'Delete a submitted SimC profile';
export const SET_PROFILE = "React's setSate with profiles";

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

export function setProfile() {
  return {
    type: SET_PROFILE
  };
}
