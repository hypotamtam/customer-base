import React from 'react'
import PropTypes from 'prop-types'
import '../../Text.css'
import User from './User'
import userPropTypes from '../userPropTypes'


const Users = ({ users }) => (
  <div id="users">
    <div className="category-title text-uppercase"><strong>User list</strong></div>
    <ul className="list-group">
      {users.map(user => <li className="list-group-item" key={user.id}><User user={user} /></li>)}
    </ul>
  </div>
)


Users.propTypes = {
  users: PropTypes.arrayOf(userPropTypes).isRequired
}

export default Users
