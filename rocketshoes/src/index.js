import React from 'react';
import {Text, StatusBar} from 'react-native';

import './config/ReactotronConfig';

console.tron.log('hola');

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Text> Olá! novamente</Text>
    </>
  );
};

export default App;
