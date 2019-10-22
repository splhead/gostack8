import React from 'react';

import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { Provider } from 'react-redux';
import NavigationService from './services/NavigationService';
import store from './store';

import Routes from './routes';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Routes
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </>
    </Provider>
  );
};

export default App;
