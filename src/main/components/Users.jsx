import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../Text.css'
import User from './User'
import userPropTypes from '../userPropTypes'
import selectUser from '../actions/selectUser'


export class UsersComponent extends Component {
  createUserComponent(user) {
    const { selectedUser, onUserSelected } = this.props
    const cssClasses = (selectedUser && user.id === selectedUser.id) ? 'active list-group-item' : 'list-group-item'
    return (
      <li className={cssClasses} onClick={() => onUserSelected(user)} key={user.id}>
        <User user={user} />
      </li>)
  }

  render() {
    return (
      <div id="users">
        <div className="category-title text-uppercase"><strong>User list</strong></div>
        <ul className="list-group">
          {this.props.users.map(user => this.createUserComponent(user))}
        </ul>
      </div>)
  }
}

UsersComponent.defaultProps = {
  selectedUser: undefined,
  onUserSelected: () => {}
}

UsersComponent.propTypes = {
  users: PropTypes.arrayOf(userPropTypes).isRequired,
  selectedUser: userPropTypes,
  onUserSelected: PropTypes.func
}

const mapStateToProps = state => ({
  selectedUser: state.selectedUser
})

const mapDispatchToProps = dispatch => ({
  onUserSelected: user => dispatch(selectUser(user))
})

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersComponent)

export default Users
