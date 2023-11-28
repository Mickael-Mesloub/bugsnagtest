import Bugsnag from '@bugsnag/react-native';
// import BugsnagPerformance from '@bugsnag/react-native-performance';

Bugsnag.start();
Bugsnag.notify(new Error('Automatic error'));
// BugsnagPerformance.start({apiKey: 'dfd772b69da971c2fd4cd0d94ea0d8f4'});

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
