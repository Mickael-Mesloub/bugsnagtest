/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Bugsnag from '@bugsnag/react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';

export const user = {
  id: '1',
  name: 'Mickaël',
  email: 'm.mesloub@beapp.fr',
  isAdmin: true,
  isLogged: false,
};

Bugsnag.start({
  onError: event => {
    event.addMetadata('UserDetails', user);
  },
});

Bugsnag.notify(new Error('Automatic error'));

function App(): JSX.Element {
  const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

  const onError = () => {
    console.log('render errror');
    Bugsnag.notify(new Error('RENDER ERROR'), function (event) {
      event.context = 'RENDER ERROR';
    });
  };

  // const ErrorView = ({clearError}) => (
  //   <View>
  //     <Text>
  //       Inform users of an error in the component tree. Use clearError to reset
  //       ErrorBoundary state and re-render child tree.
  //     </Text>
  //     <Button onPress={clearError} title="Reset" />
  //   </View>
  // );

  return (
    <NavigationContainer>
      <ErrorBoundary onError={onError}>
        <HomeScreen />
      </ErrorBoundary>
    </NavigationContainer>
  );
}

export default App;
