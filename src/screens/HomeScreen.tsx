import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Bugsnag from '@bugsnag/react-native';
import axios from 'axios';

const HomeScreen = () => {
  async function afficherFilms() {
    axios
      .get('/user?ID=12345')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        Bugsnag.leaveBreadcrumb('I clicked the Axios button');
        // Bugsnag.addFeatureFlag('Axios');
        Bugsnag.notify(error);
        console.log(error);
      });
  }

  const axiosGET = () => {
    axios
      .get('/user?ID=12345')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // Bugsnag.addFeatureFlag('Axios');
        Bugsnag.notify(`AXIOS ERROR ${error}`);
        console.log(error);
      });
  };

  const customizedDiagnosticData = () => {
    Bugsnag.leaveBreadcrumb('I clicked the customize button');
    Bugsnag.notify(
      new Error('Test customized diagnostic data'),
      function (event) {
        if (event.getUser().id === '1') {
          return false;
        }
        event.severity = 'info';
        event.context = 'Customized diagnostic data';
        event.addMetadata('customized', {isCustomized: true});
      },
    );
  };

  const notifyError = () => {
    console.log('notified error');
    Bugsnag.leaveBreadcrumb('I clicked the Notify button');
    Bugsnag.notify(new Error('Notified error'), function (event) {
      event.context = 'Customized diagnostic data';
      if (event.context === 'Customized diagnostic data') {
        console.log('The context is Customized diagnostic data');
      } else {
        console.log('No context');
      }
      console.log(event);
    });
  };

  const failedPromise = () => {
    const promiseExample = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Cette promesse a été rejetée.'));
      }, 1000);
    });

    promiseExample
      .then(result => {
        console.log('La promesse a été résolue avec succès:', result);
      })
      .catch(error => {
        console.error(
          "La promesse a été rejetée avec l'erreur:",
          error.message,
        );
        Bugsnag.notify(
          "La promesse a été rejetée avec l'erreur:",
          error.message,
        );
      });
    return promiseExample;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Tests BugsSnag</Text>

        <Pressable style={styles.button} onPress={notifyError}>
          <Text style={styles.buttonText}>Notify</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={afficherFilms}>
          <Text style={styles.buttonText}>Axios</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={axiosGET}>
          <Text style={styles.buttonText}>Axios 2</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={customizedDiagnosticData}>
          <Text style={styles.buttonText}>Customize</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={failedPromise}>
          <Text style={styles.buttonText}>Failed promise</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 32,
    padding: 16,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'red',
    width: '33%',
  },
  buttonText: {
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
  },
});
