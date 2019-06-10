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
      //myfirebase
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