import React, { Component } from 'react';

class Box extends Component {
  render() {
    return <button onClick={this.props.onFilterQuery}>Hi</button>
  }
}

export default Box;
