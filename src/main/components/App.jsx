import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { Label } from 'react-bootstrap'
import logo from './logo.svg'
import './App.css'
import Users from './Users'
import userPropTypes from '../userPropTypes'

export class AppComponent extends Component {
  createUsersComponent() {
    const { users } = this.props
    if (!isLoaded(users)) {
      return <h1><Label bsStyle="info">Loading</Label></h1>
    }
    if (isEmpty(users)) {
      return <h1><Label bsStyle="info">No user founds</Label></h1>
    }

    return <Users users={users} />
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
  users: undefined
}

AppComponent.propTypes = {
  users: PropTypes.arrayOf(userPropTypes)
}

const mapStateToProps = state => ({
  users: state.firestore.ordered.users
})

const App = compose(
  firestoreConnect([{ collection: 'users' }]),
  connect(mapStateToProps)
)(AppComponent)

export default App
