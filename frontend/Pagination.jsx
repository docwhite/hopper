import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    const limit = this.props.numbers.map(l => <option key={l} value={l}>{l}</option>);

    return (
      <div className="Pagination">
        <button onClick={this.props.onTurnPrevious}>-</button>
        <span>{this.props.page}</span>
        <button onClick={this.props.onTurnNext}>+</button>
        <select onChange={this.props.onLimitChange}>{limit}</select>
      </div>
    );
  }
}

export default Pagination;
