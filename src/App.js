import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './redux/configure-store';
import Home from './pages/Home';
import GlobalStyle from './globalStyle';
import localforage from 'localforage';

//localforage.clear();

const [store, persistor] = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <Home />
      </PersistGate>
    </Provider>
  );
}

export default App;
