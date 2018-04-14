import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import logo from './logo.svg'
import './App.css'
import Users from './Users'
import userPropTypes from '../userPropTypes'
import UserDetail from "./UserDetail";

export class AppComponent extends Component {
  createUsersComponent() {
    const { users, selectedUser } = this.props
    if (!isLoaded(users)) {
      return <h1 className="App-message"><span className="badge badge-pill badge-info">Loading</span></h1>
    }
    if (isEmpty(users)) {
      return <h1 className="App-message"><span className="badge badge-pill badge-info">No user founds</span></h1>
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Users users={users} />
          </div>
          {selectedUser &&
          <div className="col-8">
            <UserDetail user={selectedUser} />
          </div>
          }
        </div>
      </div>)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
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
  selectedUser: undefined
}

AppComponent.propTypes = {
  users: PropTypes.arrayOf(userPropTypes),
  selectedUser: userPropTypes
}

const mapStateToProps = state => ({
  users: state.firestore.ordered.users,
  selectedUser: state.selectedUser
})

const App = compose(
  firestoreConnect([{ collection: 'users' }]),
  connect(mapStateToProps)
)(AppComponent)

export default App
