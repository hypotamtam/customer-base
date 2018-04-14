import React, { Component } from 'react';
import PropTypes from "prop-types";

class Input extends Component {

  static WAIT_INTERVAL = 500;
  static ENTER_KEY = 13;

  constructor(props) {
    super(props);

    this.state = {value: props.value}
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({value: nextProps.value})
    }
  }

  componentWillMount() {
    this.timer = null;
  }

  onChange(event) {
    clearTimeout(this.timer);

    this.setState({value: event.target.value});

    this.timer = setTimeout(() => this.triggerChange(), Input.WAIT_INTERVAL);
  }

  onKeyDown(event) {
    if (event.keyCode === Input.ENTER_KEY) {
      this.triggerChange();
    }
  }

  triggerChange() {
    this.props.onInputChange(this.state.value)
  }

  render() {
    return (
      <input className="form-control"
             value={this.state.value ? this.state.value : ''}
             onChange={(event) => this.onChange(event)}
             onKeyDown={(event) => this.onKeyDown(event)}
             type="text"
             placeholder={this.props.placeholder} />)
  }
}

Input.defaultProps = {
  value: '',
  placeholder: '',
  onInputChange: () => {}
}


Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func
}

export default Input
