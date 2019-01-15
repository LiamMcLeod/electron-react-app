import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import profiles from './profile';
import file from './file';
import gear from './gear';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    profiles,
    file,
    gear
  });
}
