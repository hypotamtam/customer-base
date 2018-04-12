import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import PropTypes from 'prop-types'
import {Label, Panel} from "react-bootstrap";

export class AppComponent extends Component {

  static propTypes = {
    users: PropTypes.array
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-body">
          {!isLoaded(this.props.users) ? <Label bsStyle="info">Loading</Label> : isEmpty(this.props.users) ? <Label bsStyle="info">No user founds</Label> :
            this.props.users.map(user =>
              <Panel key={user.id}>
                <Panel.Body>
                  <Label bsStyle="success" >{JSON.stringify(user, null, 2)}</Label>
                </Panel.Body>
              </Panel>

            )
          }
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