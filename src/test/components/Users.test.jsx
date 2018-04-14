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

  it('keep the user order defined by the user comparator', () => {
    const firstNameComparator = (userA, userB) => userA.name.firstName.localeCompare(userB.name.firstName)
    const usersWrapper = mount(<UsersComponent users={usersData} userComparator={firstNameComparator} />)
    let orderedData = [...usersData].sort(firstNameComparator)
    usersWrapper.find(User).forEach((userNode, index) => {
      expect(userNode.props().user.id).toBe(orderedData[index].id)
    })
    const noteCountComparator = (userA, userB) => userA.notes.length - userB.notes.length
    usersWrapper.props().userComparator = noteCountComparator
    orderedData = [...usersData].sort(noteCountComparator)
    usersWrapper.find(User).forEach((userNode, index) => {
      expect(userNode.props().user).toBe(orderedData[index])
    })
  })

  it('filter the users according to the filter data', () => {
    const nameFilter = user => user.name.firstName.match('Thomas') !== null
    const usersWrapper = mount(<UsersComponent users={usersData} userFilter={nameFilter} />)
    usersWrapper.find(User).forEach((userNode) => {
      expect(nameFilter(userNode.props().user)).toBe(true)
    })
    const noteFilter = user => user.notes.find(note => note.match('note')) !== undefined
    usersWrapper.props().userFilter = user => user.notes.find(note => note.match('note'))
    usersWrapper.find(User).forEach(userNode => {
      expect(noteFilter(userNode.props().user)).toBe(true)
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
