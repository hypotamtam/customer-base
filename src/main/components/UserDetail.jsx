import React, { Component } from 'react'
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'
import { withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import userPropTypes from '../userPropTypes'


export class UserDetailComponent extends Component {
  createStatusButton() {
    const { status } = this.props.user
    const selectStatusClass = 'btn btn-lg btn-primary'
    const unselectStatusClass = 'btn btn-lg btn-secondary'
    return (
      <div className="btn-group btn-group-toggle">
        <button type="button" className={status === 'prospective' ? selectStatusClass : unselectStatusClass} onClick={() => this.props.updateStatus('prospective')}>prospective</button>
        <button type="button" className={status === 'current' ? selectStatusClass : unselectStatusClass} onClick={() => this.props.updateStatus('current')}>current</button>
        <button type="button" className={status === 'non-active' ? selectStatusClass : unselectStatusClass} onClick={() => this.props.updateStatus('non-active')}>non-active</button>
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
        {contactDetailCouples.map(contactDetailCouple => (
          <dl className="row">
            <dt className="col-sm-2">{contactDetailCouple[0][0]}</dt>
            {contactDetailCouple[1] && (
              <dd className="col-10">
                <dd className="col-sm-5 p-0">{contactDetailCouple[0][1]}</dd>
                <dt className="col-sm-2">{contactDetailCouple[1][0]}</dt>
                <dd className="col-sm-5">{contactDetailCouple[1][1]}</dd>
              </dd>)}
            {contactDetailCouple[1] === undefined ? <dd className="col-sm-5">{contactDetailCouple[0][1]}</dd> : null}
          </dl>))}

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
            {this.createStatusButton()}
          </div>
        </div>
        <div className="card-body">
          <h4 className="card-title category-title">Contact details</h4>
          {this.createContactDetails()}
          <h4 className="card-title category-title">Notes</h4>
          {user.notes.map(note => <h4 className="border note">{note}</h4>)}
        </div>
        <div className="m-3">
          <button className="btn btn-primary pull-right"> Add note</button>
        </div>
      </div>
    )
  }
}

UserDetailComponent.defaultProps = {
  updateStatus: () => {},
  firestore: undefined
}

UserDetailComponent.propTypes = {
  user: userPropTypes.isRequired,
  updateStatus: PropTypes.func,
  firestore: PropTypes.shape({ // from enhnace (withFirestore)
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
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
