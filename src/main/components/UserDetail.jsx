import React from 'react'
import userPropTypes from '../userPropTypes'

const UserDetail = ({ user }) => <div> {JSON.stringify(user)}</div>

UserDetail.propTypes = {
  user: userPropTypes.isRequired
}

export default UserDetail
