import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios
      .get(`/data`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  handleInputChange(event) {
    const target = event.target;
    console.dir(target);
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
            onChange={this.handleInputChange} />
          <label htmlFor={name}>{name}</label>
        </li>
      );
    });
    const optionsLen = data.length;
    return (
      <div className="App">
        <p>{optionsLen}</p>
        <ul>
          {filtering}
        </ul>
        <Table stats={data} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);

export default App;
