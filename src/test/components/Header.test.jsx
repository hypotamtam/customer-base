import React from 'react'
import { shallow, mount } from 'enzyme'
import { HeaderComponent } from '../../main/components/Header'
import Input from '../../main/components/Input'
import { STATUS } from '../../main/types/userPropTypes'
import { SORT_FIELD, SORT_ORDER_ASC, SORT_ORDER_DSC } from '../../main/types/sortPropTypes'


describe('<Header /> should ', () => {
  it('update the filter when a search is set', () => {
    let newFilter = null
    const headerWrapper = shallow(<HeaderComponent onUpdateFilter={filter => newFilter = filter} />)
    expect(headerWrapper.find(Input)).toExist()
    headerWrapper.find(Input).props().onInputChange('test')
    expect(newFilter.text).toBe('test')
  })

  it('update the filter when a status is selected', () => {
    let newFilter = null
    const headerWrapper = mount(<HeaderComponent onUpdateFilter={filter => newFilter = filter} />)
    const statusButtonWrapper = headerWrapper.find('#FilterStatus').childAt(1).childAt(1)
    expect(statusButtonWrapper).toExist()
    statusButtonWrapper.simulate('click')
    expect(newFilter.status).toBe(STATUS[0])
  })

  it('update the sort when a order is selected', () => {
    let newSort = null
    const headerWrapper = mount(<HeaderComponent onUpdateSort={sort => newSort = sort} />)
    const orderButtonsWrapper = headerWrapper.find('#SortOrder')
    expect(orderButtonsWrapper).toExist()
    orderButtonsWrapper.childAt(0).simulate('click')
    expect(newSort.order).toBe(SORT_ORDER_DSC)
    orderButtonsWrapper.childAt(1).simulate('click')
    expect(newSort.order).toBe(SORT_ORDER_ASC)
  })

  it('update the sort when a field is selected', () => {
    let newSort = null
    const headerWrapper = mount(<HeaderComponent onUpdateSort={sort => newSort = sort} />)
    const fieldButtonWrapper = headerWrapper.find('#SortField').childAt(1).childAt(0)
    expect(fieldButtonWrapper).toExist()
    fieldButtonWrapper.simulate('click')
    expect(newSort.field).toBe(SORT_FIELD[0])
  })
})
