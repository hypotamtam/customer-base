import PropTypes from 'prop-types'

export const SORT_FIELD_NAME = 'name'
export const SORT_FIELD_CONTACT_DETAILS = 'contactDetails'
export const SORT_FIELD_NOTES = 'notes'
export const SORT_FIELD_STATUS = 'status'
export const SORT_FIELD_CREATION = 'creation'
export const SORT_FIELD = [SORT_FIELD_NAME, SORT_FIELD_CONTACT_DETAILS, SORT_FIELD_NOTES, SORT_FIELD_STATUS, SORT_FIELD_CREATION]

export const SORT_ORDER_ASC = 'asc'
export const SORT_ORDER_DSC = 'dsc'
export const SORT_ORDER = [SORT_ORDER_ASC, SORT_ORDER_DSC]

export default PropTypes.shape({
  field: PropTypes.oneOf(SORT_FIELD),
  order: PropTypes.oneOf(SORT_ORDER)
})
