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
    let selectedUser = {}
    const usersWrapper = shallow(<UsersComponent users={usersData} onUserSelected={(user) => { selectedUser = user }} />)
    usersWrapper.find(User).first().parent().simulate('click')
    expect(selectedUser).toBe(usersData[0])
  })

  it('highlights the selected user', () => {
    const usersWrapper = shallow(<UsersComponent users={usersData} selectedUser={usersData[0]} />)
    const selectedUserWrapper = usersWrapper.find(User).first().parent()
    console.log(selectedUserWrapper.debug())
    expect(selectedUserWrapper.hasClass('active')).toEqual(true)
  })
})
