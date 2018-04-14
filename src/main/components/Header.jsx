/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Fa from 'react-icons/lib/fa'
import PropTypes from 'prop-types'
import './Header.css'
import Input from './Input'
import filterPropTypes from '../types/filterPropTypes'
import sortPropTypes, { SORT_FIELD, SORT_FIELD_NAME, SORT_ORDER_ASC, SORT_ORDER_DSC } from '../types/sortPropTypes'
import { STATUS } from '../types/userPropTypes'
import updateSort from '../actions/updateSort'
import updateFilter from '../actions/updateFilter'


export class HeaderComponent extends Component {
  createSortComponents() {
    const { sort } = this.props
    const isAsc = sort.order === SORT_ORDER_ASC
    const selectStatusClass = 'btn btn-lg btn-primary'
    const unselectStatusClass = 'btn btn-lg btn-secondary'
    const ascBtnClass = isAsc ? selectStatusClass : unselectStatusClass
    const dscBtnClass = isAsc ? unselectStatusClass : selectStatusClass
    return (
      <div>
        <div id="SortField" className="dropdown d-inline-block">
          <button className="btn btn-primary btn-lg dropdown-toggle" id="dropdownSort" data-toggle="dropdown">
            {this.props.sort.field}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownSort">
            {SORT_FIELD.map((field, index) => (<a
              key={index}
              className="dropdown-item text-capitalize"
              onClick={() => this.props.onUpdateSort({ ...sort, field })}
            >
              {field}
            </a>))}
          </div>
        </div>
        <div id="SortOrder" className="btn-group btn-group-toggle ml-3 d-inline-block">
          <button type="button" className={dscBtnClass} onClick={() => this.props.onUpdateSort({ ...sort, order: SORT_ORDER_DSC })}>
            <Fa.FaArrowDown className="w-75 h-75" />
          </button>
          <button type="button" className={ascBtnClass} onClick={() => this.props.onUpdateSort({ ...sort, order: SORT_ORDER_ASC })}>
            <Fa.FaArrowUp className="w-75 h-75" />
          </button>
        </div>
      </div>
    )
  }

  createFilterComponents() {
    const { text, status } = this.props.filter
    return (
      <div>
        <div className="Header-search ml-3">
          <Input placeholder="Search users" value={text} onInputChange={value => this.props.onUpdateFilter({ status, text: value })} />
        </div>
        <div id="FilterStatus" className="dropdown d-inline-block ml-3">
          <button className="btn btn-primary btn-lg dropdown-toggle" id="dropdownStatus" data-toggle="dropdown">
            {status ? status : 'Status filter'}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownStatus">
            <a className="dropdown-item" onClick={() => this.props.onUpdateFilter({ status: null, text })}>All</a>
            {STATUS.map((value, index) => (<a
              key={index}
              className="dropdown-item text-capitalize"
              onClick={() => this.props.onUpdateFilter({ status: value, text })}
            >{value}
            </a>))}
          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div>
        <div className="d-inline-block"> {this.createSortComponents()} </div>
        <div className="d-inline-block"> {this.createFilterComponents()} </div>
      </div>
    )
  }
}

HeaderComponent.defaultProps = {
  filter: {},
  sort: { field: SORT_FIELD_NAME, order: SORT_ORDER_ASC },
  onUpdateSort: () => {
  },
  onUpdateFilter: () => {
  }
}

HeaderComponent.propTypes = {
  filter: filterPropTypes,
  sort: sortPropTypes,
  onUpdateSort: PropTypes.func,
  onUpdateFilter: PropTypes.func
}

const mapStateToProps = state => ({
  sort: state.sort,
  filter: state.filter
})

const mapDispatchToProps = dispatch => ({
  onUpdateFilter: filter => dispatch(updateFilter(filter)),
  onUpdateSort: sort => dispatch(updateSort(sort))
})

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)

export default Header
