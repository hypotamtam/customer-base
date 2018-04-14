import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import User from './User'
import userPropTypes from '../types/userPropTypes'
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
    const { users, userComparator } = this.props
    const comparator = userComparator ? userComparator : (userA, userB) => users.indexOf(userA) - users.indexOf(userB)
    const orderedUsers = [...this.props.users]
      .filter(this.props.userFilter)
      .sort(comparator)
    return (
      <div id="users">
        <ul className="list-group">
          {orderedUsers.map(user => this.createUserComponent(user))}
        </ul>
      </div>)
  }
}

UsersComponent.defaultProps = {
  selectedUserId: undefined,
  userComparator: undefined,
  userFilter: () => true,
  onUserSelected: () => {
  }
}

UsersComponent.propTypes = {
  users: PropTypes.arrayOf(userPropTypes).isRequired,
  selectedUserId: PropTypes.string,
  onUserSelected: PropTypes.func,
  userComparator: PropTypes.func,
  userFilter: PropTypes.func
}

const mapStateToProps = state => ({
  selectedUserId: state.selectedUserId && state.selectedUserId.value,
  userComparator: state.sort.userComparator,
  userFilter: state.filter.userFilter
})

const mapDispatchToProps = dispatch => ({
  onUserSelected: userId => dispatch(selectUser(userId))
})

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersComponent)

export default Users
