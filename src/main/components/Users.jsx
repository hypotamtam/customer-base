import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../Text.css'
import User from './User'
import userPropTypes from '../userPropTypes'
import selectUser from '../actions/selectUser'


export class UsersComponent extends Component {
  createUserComponent(user) {
    const { selectedUserId, onUserSelected } = this.props
    const cssClasses = (selectedUserId && user.id === selectedUserId) ? 'active list-group-item' : 'list-group-item'
    return (
      <li className={cssClasses} onClick={() => onUserSelected(user.id)} key={user.id}>
        <User user={user} />
      </li>)
  }

  render() {
    return (
      <div id="users">
        <ul className="list-group">
          {this.props.users.map(user => this.createUserComponent(user))}
        </ul>
      </div>)
  }
}

UsersComponent.defaultProps = {
  selectedUserId: undefined,
  onUserSelected: () => {}
}

UsersComponent.propTypes = {
  users: PropTypes.arrayOf(userPropTypes).isRequired,
  selectedUserId: PropTypes.string,
  onUserSelected: PropTypes.func
}

const mapStateToProps = state => ({
  selectedUserId: state.selectedUserId
})

const mapDispatchToProps = dispatch => ({
  onUserSelected: userId => dispatch(selectUser(userId))
})

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersComponent)

export default Users
