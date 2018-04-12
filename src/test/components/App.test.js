import React from 'react';
import {Label, Panel} from "react-bootstrap";
import {shallow} from "enzyme";
import {users} from "../data/FirestoreData";
import {AppComponent} from "../../main/components/App";
import Users from "../../main/components/Users";


describe("<App /> should ", () => {

  it('render the users\' list', () => {
    const appWrapper = shallow(<AppComponent users={users}/>)
    expect(appWrapper.find(Users)).toExist();
  })

  it('have a no user message when there\'s no user', () => {
    const appWrapper = shallow(<AppComponent users={[]}/>)
    expect(appWrapper).toExist();
    expect(appWrapper.find(Label).render().text()).toBe("No user founds")
  })

  it('display a loading when the users are loading', () => {
    const appWrapper = shallow(<AppComponent users={undefined}/>)
    expect(appWrapper).toExist();
    expect(appWrapper.find(Label).render().text()).toBe("Loading")
  })

})
