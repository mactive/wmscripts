import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Original from './Components/Original'
import { Composition, Extend } from './Hoc/Hoc'

const CompositionComponent = Composition(Original);
const ExtendComponent = Extend(Original);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CompositionComponent',
      extendName: 'extendComponent',
      extendNumberName: 9999,
      extendStringName: 'String color is lightcoral',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      name: 'NewName'
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Original /> */}
        {/* <CompositionComponent name={this.state.name} time={new Date()}/> */}

        <ExtendComponent name={this.state.extendNumberName} />
        <ExtendComponent name={this.state.extendStringName} />
        <button onClick={this.handleClick}>changeName</button>
      </div>
    );
  }
}

export default App;
