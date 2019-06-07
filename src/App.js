/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import AppContainer from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/es/integration/react'
import firebase from 'firebase'

export default class App extends Component {
  componentWillMount(){
    const config = {
      apiKey: "AIzaSyB1kg49CHdGoOTvY30-xU6IK-v5gmyb6Q4",
      authDomain: "sante-23def.firebaseapp.com",
      databaseURL: "https://sante-23def.firebaseio.com",
      projectId: "sante-23def",
      storageBucket: "sante-23def.appspot.com",
      messagingSenderId: "53829401311"
    };
    firebase.initializeApp(config);
  }

  render() {
    // let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        {/* <PersistGate persistor={persistor}> */}
          <AppContainer />
        {/* </PersistGate> */}
      </Provider>
    )
  }
}