import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }),
  createdAt: PropTypes.string.isRequired,
  email: PropTypes.string,
  notes: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.oneOf(['prospective', 'current', 'non-active'])
})
