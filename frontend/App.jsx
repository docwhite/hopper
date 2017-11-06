import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Table from './Table.jsx'
import Box from './Box.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {data: [], filter: [], query: ''};
  }

  componentDidMount() {
    axios
      .get('/data')
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
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
    const optionsLen = data.length;
    return (
      <div className="App">
        <ul>
          {filtering}
        </ul>
        <Box onQueryChange={this.handleQueryChange} />
        <Table stats={data} filter={this.state.filter} query={this.state.query} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);

export default App;
