import PropTypes from 'prop-types'

export const userNamePropTypes = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
})

export const contactDetailsPropTypes = PropTypes.shape({
  email: PropTypes.string,
  landline: PropTypes.string,
  mobile: PropTypes.string,
  address: PropTypes.string
})

export const userNotesPropTypes = PropTypes.arrayOf(PropTypes.string)

export const STATUS_PROSPECTIVE = 'prospective'
export const STATUS_CURRENT = 'current'
export const STATUS_NON_ACTIVE = 'non-active'
export const STATUS = [STATUS_PROSPECTIVE, STATUS_CURRENT, STATUS_NON_ACTIVE]
export const statusPropTypes = PropTypes.oneOf(STATUS)

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: userNamePropTypes.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  notes: userNotesPropTypes.isRequired,
  status: statusPropTypes.isRequired,
  contactDetails: contactDetailsPropTypes.isRequired
})
