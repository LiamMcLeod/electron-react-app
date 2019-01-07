import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import profile from './profile';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    profile
  });
}
