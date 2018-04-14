import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { SELECT_USER_ACTION } from './actions/selectUser'
import { SORT_FIELD_CONTACT_DETAILS, SORT_FIELD_NAME, SORT_FIELD_NOTES, SORT_FIELD_STATUS, SORT_ORDER_ASC } from './types/sortPropTypes'
import { UPDATE_SORT_ACTION } from './actions/updateSort'

const selectedUserReducer = (state = null, action) => {
  if (action.type === SELECT_USER_ACTION) {
    return { ...state, value: action.userId }
  }
  return state
}

const sortUpdateReducer = (state = { field: SORT_FIELD_NAME, order: SORT_ORDER_ASC }, action) => {
  if (action.type !== UPDATE_SORT_ACTION) {
    return state
  }

  let comparator
  const isASC = action.sort.order === SORT_ORDER_ASC
  if (action.sort.field === SORT_FIELD_NAME) {
    comparator = (userA, userB) => {
      const nameA = userA.name.firstName + userA.name.lastName
      const nameB = userB.name.firstName + userB.name.lastName
      return isASC ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB)
    }
  } else if (action.sort.field === SORT_FIELD_STATUS) {
    comparator = (userA, userB) => (isASC ? userB.status.localeCompare(userA.status) : userA.status.localeCompare(userB.status))
  } else if (action.sort.field === SORT_FIELD_NOTES) {
    comparator = (userA, userB) => (isASC ? userB.notes.length - userA.notes.length : userA.notes.length - userB.notes.length)
  } else if (action.sort.field === SORT_FIELD_CONTACT_DETAILS) {
    comparator = (userA, userB) => {
      const contactDetailsCountA = Object.keys(userA.contactDetails).length
      const contactDetailsCountB = Object.keys(userB.contactDetails).length
      return isASC ? contactDetailsCountB - contactDetailsCountA : contactDetailsCountA - contactDetailsCountB
    }
  }
  return ({ ...action.sort, userComparator: comparator })
}

const rootReducer = combineReducers({
  sort: sortUpdateReducer,
  selectedUserId: selectedUserReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer
