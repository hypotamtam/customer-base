import React from 'react'
import { mount, shallow } from 'enzyme'
import Users from '../../main/components/Users'
import User from '../../main/components/User'
import usersData from '../data/usersData'

describe('<Users /> should ', () => {
  it('render all users', () => {
    const usersWrapper = mount(<Users users={usersData} />)
    expect(usersWrapper.find(User)).toHaveLength(usersData.length)
  })

  it('keep the user order', () => {
    const usersWrapper = shallow(<Users users={usersData} />)
    usersWrapper.find(User).forEach((userNode, index) => {
      expect(userNode.props().user).toBe(usersData[index])
    })
  })
})
