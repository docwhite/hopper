import React, { Component } from 'react';

class Table extends Component {
  render() {
    const head = this.props.filter.map((name) => <th key={name}>{name}</th>);
    let commands = [];
    let filteredQuery;

    if (this.props.stats.length) {
      filteredQuery = this.props.stats.filter((stat) =>{
        let result = true;
        try {
          result = eval(this.props.query);
        } catch(e) {
          if (e instanceof SyntaxError) {
            result = true;
          }
        }
        result = result === undefined ? true : result;
        return result;
      }, this);
    } else {
      filteredQuery = this.props.stats;
    }
    const rows = filteredQuery.map((stat) => {
      return (
        <tr key={stat.id}>
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
