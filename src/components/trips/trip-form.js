import React, { Component, PropTypes } from 'react';


export class TripForm extends Component {
  static propTypes = {
    createTrip: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {title: ''};

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  clearInput() {
    this.setState({title: ''});
  }

  onChange(event) {
    this.setState({title: event.target.value});
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    if (title.length) this.props.createTrip(title);
    this.clearInput();
  }

  render() {
    return (
      <form className="trip-form" onSubmit={this.onSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="trip-form__input"
          maxLength="64"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="What needs to be done?"
          ref={c => this.titleInput = c}
          type="text"
          value={this.state.title}
        />
      </form>
    );
  }
}
