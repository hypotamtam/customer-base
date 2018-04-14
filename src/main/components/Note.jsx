import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'
import PropTypes from 'prop-types'

class Note extends Component {

  static WAIT_INTERVAL = 500;
  static ENTER_KEY = 13;

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {value: props.note}
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.props) {
      this.setState({value: nextProps.note})
    }
  }

  componentWillMount() {
    this.timer = null;
  }

  onChange(event) {
    clearTimeout(this.timer);

    this.setState({value: event.target.value});

    this.timer = setTimeout(() => this.triggerChange(), Note.WAIT_INTERVAL);
  }

  triggerChange() {
    this.props.onInputChange(this.textInput.value)
  }

  render() {
    return (
      <h4>
        <Textarea className="border UserDetail-note w-100"
                  value={this.state.value}
                  onChange={(event) => this.onChange(event)}
                  placeholder={this.props.placeholder}
                  inputRef={(textInput) => this.textInput = textInput}/>
      </h4>
    )
  }
}

Note.defaultProps = {
  placeholder: null,
  onInputChange: () => {}
}


Note.propTypes = {
  note: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func
}

export default Note
