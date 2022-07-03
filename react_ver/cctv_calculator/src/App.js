import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";

//function is broken cant return list of options
function generateOptions(maxCameras) {
  let filledArrayOptions = new Array(maxCameras);
  for (let i = 0; i < maxCameras; i++) {
    filledArrayOptions.map((i) => <option value={i}>{i}</option>);
  }
  return filledArrayOptions;
}

class CCTVForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
        <label>
          Select camera amount:
          <select value={this.state.value} onChange={this.handleChange}>
            {generateOptions(10)}
          </select>
        </label>
      </form>
    );
  }
}

function App() {
  return (
    <div className="App">
      <CCTVForm></CCTVForm>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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

export default App;
