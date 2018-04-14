import React from 'react'
import PropTypes from 'prop-types'

const ContactDetail = ({ type, value }) => (
  <div className="row">
    <div className="col-3 UserDetail-contact-detail"><strong>{type}</strong></div>
    <div className="col-7 UserDetail-contact-detail p-0">{value}</div>
  </div>
)

ContactDetail.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default ContactDetail
