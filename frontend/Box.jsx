import React, { Component } from 'react';

class Box extends Component {
  render() {
    console.log(this.props);
    return <button onClick={this.props.onFilterQuery}>Hi</button>
  }
}

export default Box;
