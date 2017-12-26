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

  loadFromServer() {
     axios
      .get('/data', {
        params: {
          limit: this.state.limit,
          page: this.state.page
        },
      })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.loadFromServer();
  }

  turnNextPage() {
    this.setState({ page: this.state.page + 1});
    this.loadFromServer();
  }

  turnPreviousPage() {
    this.setState({ page: this.state.page - 1});
    this.loadFromServer();
  }

  limitChange(ev) {
    console.dir(ev);
  }

  handleQueryChange(ev) {
    this.setState({query: ev.target.value});
  }

  handleFilterChange(event) {
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
        <Table stats={data} filter={filter} query={query} />
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
