import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Original from './Components/Original'
import { Composition } from './Hoc/Hoc'

const CompositionComponent = Composition(Original);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CompositionComponent'
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
        <Original />
        <CompositionComponent name={this.state.name} time={new Date()}/>
        <button onClick={this.handleClick}>changeName</button>
      </div>
    );
  }
}

export default App;
