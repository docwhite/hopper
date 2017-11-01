import React, { Component } from 'react';

class Table extends Component {
  render() {
    const head = this.props.filter.map((name) => <th key={name}>{name}</th>);
    const rows = this.props.stats.map((stat) => {
      return (
        <tr key={stat.name}>
          {this.props.filter.map((f) => <td key={f}>{stat[f]}</td>)}
        </tr>
      )
    }, this);

    return (
      <table>
        <tbody>
          <tr>
            {head}
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default Table;
