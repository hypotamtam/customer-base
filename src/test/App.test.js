import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import {AppComponent} from '../main/App';
import {Label, Panel} from "react-bootstrap";


describe("<App /> should ", () => {

  it('render all users', () => {
    const users = [{
      id: "user1",
      name: {
        firstName: "Thomas",
        lastName: "Cassany"
      }
    }]
    const appWrapper = shallow(<AppComponent AppComponent users={users}/>)
    expect(appWrapper.find(Panel)).toHaveLength(1);
  })

  it('have a no user message when there\'s no user', () => {
    const appWrapper = shallow(<AppComponent AppComponent users={[]}/>)
    expect(appWrapper).toExist();
    expect(appWrapper.find(Label).render().text()).toBe("No user founds")
  })

  it('display a loading when the users are loading', () => {
    const appWrapper = shallow(<AppComponent AppComponent users={undefined}/>)
    expect(appWrapper).toExist();
    expect(appWrapper.find(Label).render().text()).toBe("Loading")
  })

})
