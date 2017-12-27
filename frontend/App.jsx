import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';

import Table from './Table.jsx'
import Box from './Box.jsx'
import Average from './Average.jsx'
import Pagination from './Pagination.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.turnNextPage = this.turnNextPage.bind(this);
    this.turnPreviousPage = this.turnPreviousPage.bind(this);
    this.limitChange = this.limitChange.bind(this);
    this.state = {
      data: [],
      filter: [],
      query: '',
      limit: 25,
      page: 1

    };
  }

  loadFromServer(limit, page, query = '') {
     axios
      .get('/data', {
        params: {
          limit: limit,
          page: page,
          query: query
        },
      })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.loadFromServer(25, 1);
  }

  turnNextPage() {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
    this.loadFromServer(this.state.limit, newPage);
  }

  turnPreviousPage() {
    const newPage = Math.max(this.state.page - 1, 1);
    this.setState({ page: newPage });
    this.loadFromServer(this.state.limit, newPage);
  }

  limitChange(ev) {
    const newLimit = ev.target.value;
    this.setState({ limit: newLimit });
    this.loadFromServer(newLimit, this.state.page);
  }

  handleQueryChange(ev) {
    const newQuery = ev.target.value;
    this.setState({ query: newQuery });
    this.loadFromServer(this.state.limit, this.state.page, newQuery);
  }

  handleFilterChange(event) {
    const target = event.target;
    const filter = this.state.filter;
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
    const query = this.state.query;
    const filter = this.state.filter;
    const fields = Object.keys(data.length ? data[0] : {});
    const filtering = fields.map((name) => {
      return (
        <li key={name}>
          <input
            id={name}
            name={name}
            type="checkbox"
            onChange={this.handleFilterChange} />
          <label htmlFor={name}>{name}</label>
        </li>
      );
    });

    return (
      <div className="App">
        <ul>
          {filtering}
        </ul>
        <Pagination
          numbers={["25", "50", "75", "100", "-"]}
          page={this.state.page}
          onTurnNext={this.turnNextPage}
          onTurnPrevious={this.turnPreviousPage}
          onLimitChange={this.limitChange} />
        <Box onQueryChange={this.handleQueryChange} />
        <Table stats={data} filter={filter} />
        <Average stats={data} filter={filter} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);

export default App;
