import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import PropTypes from 'prop-types'
import {Label, Panel} from "react-bootstrap";
import Users from "./Users";

export class AppComponent extends Component {

  static propTypes = {
    users: PropTypes.array
  }

  createUsersComponent() {
    const users = this.props.users;
    if (!isLoaded(users)) {
      return <h1><Label bsStyle="info">Loading</Label></h1>
    }
    if (isEmpty(users)) {
      return <h1><Label bsStyle="info">No user founds</Label></h1>
    }

    return <Users users={users}/>
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-body">
          {this.createUsersComponent()}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => ({
  users: state.firestore.ordered.users
})

export default compose(
  firestoreConnect([{collection: 'users'}]),
  connect(mapStateToProps)
)(AppComponent)