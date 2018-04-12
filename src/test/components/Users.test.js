import React from 'react';
import {mount, shallow} from "enzyme";
import Users from "../../main/components/Users";
import {users} from "../data/FirestoreData";
import User from "../../main/components/User";

describe("<Users /> should ", () => {

  it('render all users', () => {
    const usersWrapper = mount(<Users users={users}/>)
    expect(usersWrapper.find(User)).toHaveLength(users.length)
  })

  it('keep the user order', () => {
    const usersWrapper = shallow(<Users users={users}/>)
    usersWrapper.find(User).forEach((userNode, index) => {
      expect(userNode.props().user).toBe(users[index])
    })
  })
})