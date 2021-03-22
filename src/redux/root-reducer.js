import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'localforage';

import calendar from './ducks/calendar';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['calendar'], // TODO, figure out why persistor isn't saving all pokemon details
};

const rootReducer = combineReducers({
  calendar,
});

export default persistReducer(persistConfig, rootReducer);
