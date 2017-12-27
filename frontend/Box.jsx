import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      <div className="Box">
        <input type="text" onBlur={this.props.onQueryChange} />
      </div>
    )
  }
}

export default Box;
