/** @format */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => SocketIO3);
import React, {Component} from 'react';
import App from './Components/App';

export default class SocketIO3 extends Component {
  render() {
    return (
        <App />
    );
  }
}