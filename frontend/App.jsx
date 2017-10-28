import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table.jsx'

class App extends React.Component {
  constructor() {
    super();
    console.log("Constructing App");
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
    return (
      <div className="App">
        <p>placeholder</p>
        <Table stats={data} />
      </div>
    )
  }
}

ReactDOM.render(
  <App message="hello" />,
  document.querySelector('#root')
);
// export default App;
