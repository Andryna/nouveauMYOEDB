// /**
//  * @format
//  */

// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// import Demarrage from './apps/screens/demarrage'; 
import Demarrage from './apps2/screens/demarrage'; 
import { Provider } from 'react-redux'; 
import store from './apps2/store/store.js';
const AppWithRedux = () => (
    <Provider store={store}>
      <Demarrage />
    </Provider>
  );

AppRegistry.registerComponent(appName, () => AppWithRedux);
