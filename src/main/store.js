import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import { createStore, compose } from 'redux'
import rootReducer from './reducer'
import { firebase as fbConfig } from './config'

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableLogging: false
}

const initialState = {}

export default function configureStore() {
  firebase.initializeApp(fbConfig)
  firebase.firestore()

  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
  )(createStore)

  return createStoreWithFirebase(rootReducer, initialState)
}
