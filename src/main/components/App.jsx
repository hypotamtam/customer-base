import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import './App.css'
import Users from './Users'
import userPropTypes from '../types/userPropTypes'
import UserDetail from './UserDetail'
import Header from "./Header";

export class AppComponent extends Component {
  createUsersComponent() {
    const { users, selectedUserId } = this.props
    if (!isLoaded(users)) {
      return <h1 className="App-message"><span className="badge badge-pill badge-info">Loading</span></h1>
    }
    if (isEmpty(users)) {
      return <h1 className="App-message"><span className="badge badge-pill badge-info">No user founds</span></h1>
    }

    const selectedUser = selectedUserId && users.find(user => user.id === selectedUserId)
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Users users={users}/>
          </div>
          {selectedUser &&
          <div className="col-8">
            <UserDetail user={selectedUser}/>
          </div>
          }
        </div>
      </div>)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header/>
        </header>
        <div className="App-body">
          {this.createUsersComponent()}
        </div>
      </div>
    )
  }
}

AppComponent.defaultProps = {
  users: undefined,
  selectedUserId: undefined
}

AppComponent.propTypes = {
  users: PropTypes.arrayOf(userPropTypes),
  selectedUserId: PropTypes.string
}

const mapStateToProps = state => ({
  users: state.firestore.ordered.users,
  selectedUserId: state.selectedUserId && state.selectedUserId.value
})

const App = compose(
  firestoreConnect([{ collection: 'users' }]),
  connect(mapStateToProps)
)(AppComponent)

export default App
