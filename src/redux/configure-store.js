import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import rootReducer from './root-reducer';

const configStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    /*BELOW IS REQUIRED ONLY FOR REDUX-PERSIST TO AVOID NON-SERIALIZABILITY CHECK*/
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    /*ABOVE IS REQUIRED ONLY FOR REDUX-PERSIST TO AVOID NON-SERIALIZABILITY CHECK*/
  });
  const persistor = persistStore(store);
  return [store, persistor];
};

export default configStore;
