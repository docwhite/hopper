import React from 'react';

class Average extends React.Component {
  render() {
    let numEntries = this.props.stats.length;
    let report = {};
    this.props.filter.forEach((f) => {
      if (numEntries > 0) {
        if (!isNaN(this.props.stats[0][f])) {
          let sum = 0;
          let min = 0;
          let max = 0;
          this.props.stats.forEach(stat => {
            sum += stat[f];
            if (stat[f] < min) { min = stat[f]; }
            if (stat[f] > max) { max = stat[f]; }
          });
          report[f] = {
            sum: sum,
            avg: sum / numEntries,
            min: min,
            max: max
          };
        }
      }
    });

    let rows = Object.keys(report).map(k => {
      return (
        <tr key={k}>
          <td>{report[k].sum}</td>
          <td>{report[k].avg}</td>
          <td>{report[k].min}</td>
          <td>{report[k].max}</td>
          <td>{k}</td>
        </tr>
      );
    });

    let head = ['sum', 'avg', 'min', 'max'].map(k => <th key={k}>{k}</th>);
    return (
      <div className="Average">
        <table>
          <tbody>
            <tr>{head}</tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Average;
