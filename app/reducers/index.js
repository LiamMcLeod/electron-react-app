import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import profiles from './profile';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    profiles
  });
}
