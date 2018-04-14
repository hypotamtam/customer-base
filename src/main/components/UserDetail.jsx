/* eslint-disable react/no-array-index-key, import/no-named-as-default */
import React, { Component } from 'react'
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'
import { withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import './UserDetail.css'
import userPropTypes from '../types/userPropTypes'
import Note from './Note'
import ContactDetail from './ContactDetail'

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

  createContactDetails() {
    const { contactDetails } = this.props.user
    const contactDetailCouples = Object.keys(contactDetails).reduce((previousValue, currentKey, currentIndex) => {
      if (currentIndex % 2 === 0) {
        previousValue.push({ left: [currentKey, contactDetails[currentKey]] })
      } else {
        previousValue[previousValue.length - 1].right = [currentKey, contactDetails[currentKey]]
      }
      return previousValue
    }, [])
    return (
      <div>
        {contactDetailCouples.map((contactDetailCouple, index) => (
          <div className="row" key={index}>
            <div className="col-6">
              <ContactDetail type={contactDetailCouple.left[0]} value={contactDetailCouple.left[1]}/>
            </div>
            {contactDetailCouple.right && (
              <div className="col-6">
                <ContactDetail type={contactDetailCouple.right[0]} value={contactDetailCouple.right[1]}/>
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
          {user.notes.map((note, index) => <Note key={index} note={note} onInputChange={value => this.props.updateNote(value, index)}/>)}
        </div>
        <div className="m-3">
          <button id="AddNoteBtn" className="btn btn-primary pull-right" onClick={this.props.addNote}> Add note</button>
        </div>
      </div>
    )
  }
}

UserDetailComponent.defaultProps = {
  updateStatus: () => {
  },
  updateNote: () => {
  },
  addNote: () => {
  },
  firestore: undefined
}

UserDetailComponent.propTypes = {
  user: userPropTypes.isRequired,
  updateStatus: PropTypes.func,
  updateNote: PropTypes.func,
  addNote: PropTypes.func,
  firestore: PropTypes.shape({ // from enhnace (withFirestore)
    update: PropTypes.func.isRequired
  })
}

const UserDetail = compose(
  withFirestore,
  withHandlers({
    updateStatus: props => status => props.firestore.update({ collection: 'users', doc: props.user.id }, { ...props.user, status }),
    updateNote: props => (note, index) => {
      const newNotes = [...props.user.notes]
      newNotes[index] = note
      props.firestore.update({ collection: 'users', doc: props.user.id }, { ...props.user, notes: newNotes })
    },
    addNote: props => () => {
      const newUser = { ...props.user, notes: [...props.user.notes, ''] }
      props.firestore.update({ collection: 'users', doc: props.user.id }, newUser)
    }
  })
)(UserDetailComponent)

export default UserDetail
