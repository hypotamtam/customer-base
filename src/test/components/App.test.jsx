import React from 'react'
import { shallow } from 'enzyme'
import { AppComponent } from '../../main/components/App'
import Users from '../../main/components/Users'
import usersData from '../data/usersData'


describe('<App /> should ', () => {
  it('render the user list', () => {
    const appWrapper = shallow(<AppComponent users={usersData} />)
    expect(appWrapper.find(Users)).toExist()
  })

  it('have a no user message when there\'s no user', () => {
    const appWrapper = shallow(<AppComponent users={[]} />)
    expect(appWrapper.find(Users)).not.toExist()
    expect(appWrapper.find('.App-message').render().text()).toBe('No user founds')
  })

  it('display a loading when the users are loading', () => {
    const appWrapper = shallow(<AppComponent users={undefined} />)
    expect(appWrapper.find(Users)).not.toExist()
    expect(appWrapper.find('.App-message').render().text()).toBe('Loading')
  })
})