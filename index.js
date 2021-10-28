/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//是否在app模拟器底部显示黄色提示
console.disableYellowBox = true;

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
    assert: () => {},
  };
}

AppRegistry.registerComponent(appName, () => App);
