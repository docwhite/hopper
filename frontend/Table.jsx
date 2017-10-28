import React, { Component } from 'react';
// import './Table.css';

class Table extends Component {
  render() {
    const rows = this.props.stats.map((stat) => {
      return (
        <tr key={stat.name}>
          <td>{stat.name}</td>
          <td>{stat.surname}</td>
          <td>{stat.age}</td>
        </tr>
      )
    })
    return (
      <table>
        <tbody>
          <tr key="yey">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default Table;
