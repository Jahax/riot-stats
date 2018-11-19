import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Stats from './components/Stats';

class App extends Component {
  state = {
    region: 'NA1',
    name: 'Jahax',
    searching: false,
    matches: [],
  };

  handleNameChanged = (event) => (
    this.setState({name: event.target.value},
    this.setState({matches: []})
  ));

  handleRegionChanged = (event) => (
    this.setState({region: event.target.value},
    this.setState({matches: []})
  ));

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({matches: []});
    this.setState({searching: true});
    const res = await axios.get(`api/stats/${this.state.region}/${this.state.name}`)
    console.log(res);
    this.setState({searching: false});
    this.setState({matches: res.data.matches});
  };

  render() {

    return (
      <div className="App">
        <div className="container">
        <header>
          <h3>Search League Statistics</h3>
        </header>

        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col-3"> 
              <div className="form-group">         
                <select className="form-control" value={this.state.region} onChange={this.handleRegionChanged}>
                    <option value="BR1">BR</option>
                    <option value="EUN1">EUNE</option>
                    <option value="EUW1">EUW</option>
                    <option value="JP1">JP</option>
                    <option value="KR">KR</option>
                    <option value="LA1">LAN</option>
                    <option value="LA2">LAS</option>
                    <option value="NA1">NA</option>
                    <option value="OC1">OCE</option>
                    <option value="TR1">TR</option>
                    <option value="RU">RU</option>
                    <option value="PBE1">PBE</option>
                </select>
              </div>
            </div>
            <div className="col-9">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" value={this.state.name} onChange={this.handleNameChanged} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col">
            <button type="submit" className="btn btn-primary btn-lg btn-block">Search</button>
            </div>
          </div>
        </form>
        {this.state.searching === true ?
        <div className="form-row">
            <div className="col">
              <p>
                <strong>Searching for {this.state.name}...</strong>
              </p>
            </div>
        </div>
        : null }

        {this.state.matches.length > 0 ?
        <div className="form-row">
            <div className="col">
              <h2>Summoner {this.state.name}</h2>
            </div>
        </div>
        : null }

        {Object.keys(this.state.matches).map((key, index) => ( 
          <Stats key={index} match={this.state.matches[key]}/>
        ))}
        
        </div>
      </div>

    );
  }
}
export default App;