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

  render() {
    let data = this.state.data;
    let fields = Object.keys(data.length ? data[0] : {});
    let filtering = fields.map((name) => {
      return <li key={name}>{name}</li>
    });
    let optionsLen = data.length;
    return (
      <div className="App">
        <p>{optionsLen}</p>
        <ul>{filtering}</ul>
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
