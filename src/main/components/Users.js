import React, {Component} from "react";
import PropTypes from "prop-types";
import User from "./User";


export class UsersComponent extends Component {

  static propTypes = {
    users: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        {this.props.users.map(user =>
          <User key={user.id} user={user}/>
        )}
      </div>
    )
  }
}

export default UsersComponent