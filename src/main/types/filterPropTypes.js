import PropTypes from 'prop-types'
import { statusPropTypes } from './userPropTypes'

export default PropTypes.shape({
  text: PropTypes.string,
  status: statusPropTypes
})
