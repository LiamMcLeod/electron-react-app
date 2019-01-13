// @flow

import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  POST_PROFILE,
  DELETE_PROFILE,
  SELECT_PROFILE,
  SET_PROFILE,
  STORE_ID
} from '../actions/profile';
import type { Action } from './types';

import ls from 'local-storage';

import log from 'electron-log';
import { id } from 'postcss-selector-parser';

//TODO MOVE PROFILES INTO SIMC FILES

export default function profile(state = [], action) {
  switch (action.type) {
    case GET_PROFILE:
      var profiles = [];
      var profile = {};
      if (ls.get('profiles')) {
        profiles = ls.get('profiles');
      }
      profile = profiles.find(key);
      return profile;
    case GET_ALL_PROFILES:
      var profiles = [];
      if (ls.get('profiles')) {
        profiles = ls.get('profiles');
        // log.info(profiles);
      }
      // log.info({ profiles: profiles });
      return { profiles: profiles };
    case POST_PROFILE:
      var profiles = [];
      var profile = { key: action.key, string: action.string };
      if (ls.get('profiles')) {
        profiles = ls.get('profiles');
        profiles.push(profile);
      } else {
        profiles = [profile];
      }

      ls.set('profiles', profiles);
      // log.info(state);
      return { profiles: profiles };
    case DELETE_PROFILE:
      // log.info(action.key);
      var success = false;
      var profiles = [];
      if (ls.get('profiles')) {
        profiles = ls.get('profiles');
      }

      var i = profiles.findIndex(o => o.key === action.key);
      if (i !== -1) {
        profiles.splice(i, 1);
        i = -1;
      }

      i = profiles.findIndex(o => o.key === action.key);
      if (i === -1) {
        success = true;
      }
      ls.set('profiles', profiles);
      // return success;
      return { profiles: profiles };
    case SELECT_PROFILE:
      var profiles = [];
      if (ls.get('profiles')) {
        profiles = ls.get('profiles');
        // log.info(profiles);
      }
      i = profiles.findIndex(o => o.key === action.key);
      return { profiles: profiles, selected: profiles[i] };
    case SET_PROFILE:
      return state;
    case STORE_ID:
      /**
       * This must be here despite the fact that it pertains to file
       *  as it is mounted to QuickSim and is seemingly the only way
       *  to effectively communicate between two stores
       */
      // log.info('Storing: ' + action.id);
      return action.id;
    default:
      return state;
  }
}
