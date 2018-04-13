import React from 'react'
import PropTypes from 'prop-types'
import User from './User'
import userPropTypes from '../userPropTypes'


const Users = ({ users }) => (
  <div>
    {users.map(user =>
      <User key={user.id} user={user} />)}
  </div>
)


Users.propTypes = {
  users: PropTypes.arrayOf(userPropTypes).isRequired
}

export default Users
