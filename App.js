import React from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { AppLoading, Icon } from 'expo';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import Geocoder from 'react-native-geocoding';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { PersistGate } from 'redux-persist/integration/react';

import config from './config';
import { store, persistor } from './store';
import Colors from './constants/Colors';
import MainNavigator from './Navigation/MainNavigator';
import { firebase as firebaseConfig } from './config';
import LocationEnableModal from './Components/LocationEnableModal'

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };

  constructor(props) {

    super(props);
    YellowBox.ignoreWarnings(['Setting a timer']);
    // Initialize Firebase
    console.log("initializing app");
    Geocoder.init(config.googlePlacesApiKey);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <View style={{ width: '100%', height: Constants.statusBarHeight, backgroundColor: Colors.tintColor }} />
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Root>
                <LocationEnableModal />
                <MainNavigator />
              </Root>
            </PersistGate>
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
