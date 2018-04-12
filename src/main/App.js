import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import PropTypes from 'prop-types'

export class AppComponent extends Component {

  static propTypes = {
    users: PropTypes.array
  }

  render() {
    console.log(this.props.users)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {!isLoaded(this.props.users) ? <p className="App-intro">Loading</p> : isEmpty(this.props.users) ? <p className="App-intro">No user founds</p> :
          this.props.users.map(user =>
            <p className="App-intro" key={user.id}>{JSON.stringify(user)}</p>
          )
        }
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