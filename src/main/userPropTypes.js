import PropTypes from 'prop-types'

export const userName = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
})

export const contactDetails = PropTypes.shape({
  email: PropTypes.string,
  landline: PropTypes.string,
  mobile: PropTypes.string,
  address: PropTypes.string
})

export const userNotes = PropTypes.arrayOf(PropTypes.string)

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: userName.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  notes: userNotes.isRequired,
  status: PropTypes.oneOf(['prospective', 'current', 'non-active']),
  contactDetails: contactDetails.isRequired
})
