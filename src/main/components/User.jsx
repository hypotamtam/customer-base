import React from 'react'
import { Label, Panel } from 'react-bootstrap'
import userPropTypes from '../userPropTypes'

const User = ({ user }) => {
  const userStringify = JSON.stringify(user, null, 2)
  return (
    <Panel>
      <Panel.Body>
        <Label bsStyle="success">{userStringify}</Label>
      </Panel.Body>
    </Panel>
  )
}

User.propTypes = {
  user: userPropTypes.isRequired
}

export default User
