import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MessageResponse } from '../common/types';
import * as lib from '../common/lib';

interface AppState {
  message: string | undefined;
}

function fetchJson(path: string) {
  return fetch(path, {
    headers: {
      'Accept': 'application/json',
    },
  });
}

class App extends Component<{}, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      message: undefined,
    };
  }

  componentDidMount() {
    fetchJson('/api/v1/message').then((res) => res.json()).then((res: MessageResponse) => {
      this.setState({ message: res.message });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Server says: {this.state.message || 'Loading...'}
          </p>
          <p>
            Lib says: {lib.foo(41)}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
