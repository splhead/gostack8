import Reactotron from 'reactotron-react-native';
import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({host})
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
