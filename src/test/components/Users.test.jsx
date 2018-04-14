import React from 'react'
import { mount, shallow } from 'enzyme'
import { UsersComponent } from '../../main/components/Users'
import User from '../../main/components/User'
import usersData from '../data/usersData'

describe('<Users /> should ', () => {
  it('render all users', () => {
    const usersWrapper = mount(<UsersComponent users={usersData} />)
    expect(usersWrapper.find(User)).toHaveLength(usersData.length)
  })

  it('keep the user order', () => {
    const usersWrapper = shallow(<UsersComponent users={usersData} />)
    usersWrapper.find(User).forEach((userNode, index) => {
      expect(userNode.props().user).toBe(usersData[index])
    })
  })

  it('fire the onUserSelected when we click on a user', () => {
    let selectedUserId = {}
    const usersWrapper = shallow(<UsersComponent users={usersData} onUserSelected={(userId) => { selectedUserId = userId }} />)
    usersWrapper.find(User).first().parent().simulate('click')
    expect(selectedUserId).toBe(usersData[0].id)
  })

  it('highlights the selected user', () => {
    const usersWrapper = shallow(<UsersComponent users={usersData} selectedUserId={usersData[0].id} />)
    const selectedUserWrapper = usersWrapper.find(User).first().parent()
    expect(selectedUserWrapper.hasClass('active')).toEqual(true)
  })
})
