import React from 'react'
import { shallow } from 'enzyme'
import { AppComponent } from '../../main/components/App'
import Users from '../../main/components/Users'
import usersData from '../data/usersData'
import UserDetail from "../../main/components/UserDetail";


describe('<App /> should ', () => {
  it('render the user list', () => {
    const appWrapper = shallow(<AppComponent users={usersData} />)
    expect(appWrapper.find(Users)).toExist()
    expect(appWrapper.find(UserDetail)).not.toExist()
  })

  it('have a no user message when there\'s no user', () => {
    const appWrapper = shallow(<AppComponent users={[]} />)
    expect(appWrapper.find(Users)).not.toExist()
    expect(appWrapper.find(UserDetail)).not.toExist()
    expect(appWrapper.find('.App-message').render().text()).toBe('No user founds')
  })

  it('display a loading when the users are loading', () => {
    const appWrapper = shallow(<AppComponent />)
    expect(appWrapper.find(Users)).not.toExist()
    expect(appWrapper.find(UserDetail)).not.toExist()
    expect(appWrapper.find('.App-message').render().text()).toBe('Loading')
  })

  it('display the user\'s detail of the selected user', () => {
    const appWrapper = shallow(<AppComponent users={usersData} selectedUser={usersData[1]} />)
    const userDetailWrapper = appWrapper.find(UserDetail)
    expect(userDetailWrapper).toExist()
    expect(userDetailWrapper.props().user).toBe(usersData[1])
  })

})