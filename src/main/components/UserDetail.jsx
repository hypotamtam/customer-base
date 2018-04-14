/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'
import { withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import './UserDetail.css'
import userPropTypes from '../userPropTypes'

export class UserDetailComponent extends Component {
  createStatusButton(value) {
    const { status } = this.props.user
    const selectStatusClass = 'btn btn-lg btn-primary'
    const unselectStatusClass = 'btn btn-lg btn-secondary'
    return (<button
      type="button"
      className={value === status ? selectStatusClass : unselectStatusClass}
      onClick={() => this.props.updateStatus(value)}
    >{value}</button>)
  }

  createStatusButtons() {
    return (
      <div className="btn-group btn-group-toggle">
        {this.createStatusButton('prospective')}
        {this.createStatusButton('current')}
        {this.createStatusButton('non-active')}
      </div>
    )
  }

  createContactDetail(key, value) {
    return (
      <div className="row">
        <div className="col-3 UserDetail-contact-detail"><strong>{key}</strong></div>
        <div className="col-7 UserDetail-contact-detail p-0">{value}</div>
      </div>
    )
  }

  createContactDetails() {
    const { contactDetails } = this.props.user
    const contactDetailCouples = Object.entries(contactDetails).reduce((previousValue, currentValue, currentIndex) => {
      if (currentIndex % 2 === 0) {
        previousValue.push([currentValue])
      } else {
        previousValue[previousValue.length - 1].push(currentValue)
      }
      return previousValue
    }, [])
    return (
      <div>
        {contactDetailCouples.map((contactDetailCouple, index) => (
          <div className="row" key={index}>
            <div className="col-6">
              {this.createContactDetail(contactDetailCouple[0][0], contactDetailCouple[0][1])}
            </div>
            {contactDetailCouple[1] && (
              <div className="col-6">
                {this.createContactDetail(contactDetailCouple[1][0], contactDetailCouple[1][1])}
              </div>
            )}
          </div>))}

      </div>
    )
  }

  render() {
    const { user } = this.props
    return (
      <div className="card">
        <div className="card-header">
          <div className="d-inline-block">
            <h1 className="text-capitalize">
              <strong>{user.name.firstName} {user.name.lastName}</strong>
            </h1>
            <p>
              <small className="h6"> {user.id}</small>
            </p>
          </div>
          <div className="pull-right">
            {this.createStatusButtons()}
          </div>
        </div>
        <div className="card-body">
          <h4 className="card-title UserDetail-category-title">Contact details</h4>
          {this.createContactDetails()}
          <h4 className="card-title UserDetail-category-title">Notes</h4>
          {user.notes.map((note, index) => (
            <h4 key={index}>
              <textarea className="border UserDetail-note w-100" value={note} />
            </h4>
          ))}
        </div>
        <div className="m-3">
          <button className="btn btn-primary pull-right"> Add note</button>
        </div>
      </div>
    )
  }
}

UserDetailComponent.defaultProps = {
  updateStatus: () => {
  },
  firestore: undefined
}

UserDetailComponent.propTypes = {
  user: userPropTypes.isRequired,
  updateStatus: PropTypes.func,
  firestore: PropTypes.shape({ // from enhnace (withFirestore)
    update: PropTypes.func.isRequired
  })
}

const UserDetail = compose(
  withFirestore,
  withHandlers({
    updateStatus: props => status =>
      props.firestore.update({ collection: 'users', doc: props.user.id }, { ...props.user, status })
  })
)(UserDetailComponent)

export default UserDetail
