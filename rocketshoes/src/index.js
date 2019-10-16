import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { Provider } from 'react-redux';
import store from './store';

import Routes from './routes';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Routes />
      </>
    </Provider>
  );
};

export default App;
