import React from 'react'
import moment from 'moment'
import * as Md from 'react-icons/lib/md'
import './User.css'
import userPropTypes from '../userPropTypes'


const User = ({ user }) => {
// eslint-disable-next-line new-cap
  const userCreationDate = new moment(user.createdAt)
  return (
    <div className="User">
      <div className="User-header pull-left">
        <p className="text-capitalize">
          <strong>{user.name.firstName} {user.name.lastName}</strong> <em className="badge badge-light">{user.status}</em>
        </p>
        <p className="text-lowercase"> Created {userCreationDate.calendar()} </p>
      </div>
      <div className="User-info float-right">
        <p className="text-lowercase">
          <span className="badge badge-info"><Md.MdComment /> {Object.keys(user.contactDetails).length} </span>
        </p>
        <p className="text-lowercase">
          <span className="badge badge-info"><Md.MdContactMail />{user.notes.length}</span>
        </p>
      </div>
    </div>
  )
}

User.propTypes = {
  user: userPropTypes.isRequired
}

export default User
