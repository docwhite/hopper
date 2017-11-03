import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      <div>
        <input type="text" onChange={this.props.onQueryChange} />
      </div>
    )
  }
}

export default Box;
