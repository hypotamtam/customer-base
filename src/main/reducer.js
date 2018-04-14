import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { SELECT_USER_ACTION } from './actions/selectUser'

const selectedUserReducer = (state = null, action) => {
  if (action.type === SELECT_USER_ACTION) {
    return { ...action.user }
  }
  return state
}

const rootReducer = combineReducers({
  selectedUser: selectedUserReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer
