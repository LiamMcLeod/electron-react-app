// @flow

import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  POST_PROFILE,
  DELETE_PROFILE,
  SELECT_PROFILE,
  STORE_ID,
  GET_ID,
  SET_PROFILE
} from '../actions/profile';
import type { Action } from './types';

import ls from 'local-storage';

import log from 'electron-log';
import { id } from 'postcss-selector-parser';

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
      log.info('Storing: ' + action.id);
      return action.id;
    case GET_ID:
      return action.id;
    default:
      return state;
  }
}

// Example: https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/todos
//
// const todos = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         {
//           id: action.id,
//           text: action.text,
//           completed: false
//         }
//       ]
//     case 'TOGGLE_TODO':
//       return state.map(todo =>
//         (todo.id === action.id)
//           ? {...todo, completed: !todo.completed}
//           : todo
//       )
//     default:
//       return state
//   }
// }

// export default todos
