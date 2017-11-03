import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <button onClick={this.props.onFilterQuery}>Hi</button>
      </div>
    )
  }
}

export default Box;
