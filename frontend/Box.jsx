import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      <div className="Box">
        <input type="text" onBlur={this.props.onQueryChange} />
        {this.props.errorMsg !== '' &&
            <div
              id="Reporter"
              dangerouslySetInnerHTML={{__html: this.props.errorMsg}}>
            </div>
        }
      </div>
    )
  }
}

export default Box;
