import React, {Component} from "react";
import PropTypes from "prop-types";
import {Label, Panel} from "react-bootstrap";


export class UserComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }


  render() {
    return (
      <Panel>
        <Panel.Body>
          <Label bsStyle="success">{JSON.stringify(this.props.user, null, 2)}</Label>
        </Panel.Body>
      </Panel>
    )
  }

}

export default UserComponent