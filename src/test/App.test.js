import React from 'react';
import ReactDOM from 'react-dom';
import {AppComponent} from '../main/App';

it('renders without crashing', () => {

  const users = [{
    id: "user1",
    name: {
      firstName: "Thomas",
      lastName: "Cassany"
    }
  }]
  const div = document.createElement('div')
  ReactDOM.render(<AppComponent users={users}/>, div)

  ReactDOM.unmountComponentAtNode(div)
});
