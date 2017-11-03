import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Table from './Table.jsx'
import Box from './Box.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filter: []
    }
  }

  componentDidMount() {
    axios
      .get(`/data`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  handleFilterQuery(ev) {
    console.log('Handling filter query.');
    console.log(ev);
  }

  handleInputChange(event) {
    const target = event.target;
    let filter = this.state.filter;
    if (target.checked) {
      filter.push(target.id);
    } else {
      const index = filter.indexOf(target.id);
      if (index !== -1) {
        filter.splice(index, 1);
      }
    }
    this.setState({ filter: filter });
  }

  render() {
    const data = this.state.data;
    const fields = Object.keys(data.length ? data[0] : {});
    const filtering = fields.map((name) => {
      return (
        <li key={name}>
          <input
            id={name}
            name={name}
            type="checkbox"
            onChange={this.handleInputChange.bind(this)} />
          <label htmlFor={name}>{name}</label>
        </li>
      );
    });
    const optionsLen = data.length;
    return (
      <div className="App">
        <ul>
          {filtering}
        </ul>
        <Table stats={data} filter={this.state.filter} />
        <Box onFilterQuery={this.handleFilterQuery.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);

export default App;
