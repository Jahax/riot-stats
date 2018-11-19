import React, { Component } from 'react';

import './Stats.css';

export default class Stats extends Component {

  render() {

    return (
      <div className="form-row matches">
        <div className="col">
          <p>
            <img className="runes" alt={this.props.match.primaryPerk.name} src={'https://ddragon.leagueoflegends.com/cdn/img/'+this.props.match.primaryPerk.icon}></img> {this.props.match.primaryPerk.name}
          </p>
          <p>
            <img className="runes" alt={this.props.match.secondaryPerkStyle.name} src={'https://ddragon.leagueoflegends.com/cdn/img/'+this.props.match.secondaryPerkStyle.icon}></img>
            {this.props.match.secondaryPerkStyle.name}
          </p>
        </div>
        <div className="col">
          <p>
            <img alt={this.props.match.champion.name} src={'http://ddragon.leagueoflegends.com/cdn/8.21.1/img/champion/'+this.props.match.champion.image.full}></img>
          </p>
          <p>
            <strong>{this.props.match.champion.name}</strong>
          </p>
        </div>
        <div className="col">
          <p>
            <img alt={this.props.match.spell1.name} src={'http://ddragon.leagueoflegends.com/cdn/8.21.1/img/spell/'+this.props.match.spell1.image.full}></img>
          </p>
          <p>
            <img alt={this.props.match.spell2.name} src={'http://ddragon.leagueoflegends.com/cdn/8.21.1/img/spell/'+this.props.match.spell2.image.full}></img>
          </p>
        </div>
        <div className="col">
          <p>
            <strong>{this.props.match.win === true ? 'Victory' : 'Defeat'}</strong>
          </p>
          <p>
            <strong>{this.props.match.kills}/{this.props.match.deaths}/{this.props.match.assists}</strong> (k/d/a) {this.props.match.kda}
          </p>
          <p>
            <strong>{this.props.match.gameTime}</strong> - <strong>Level: {this.props.match.champLevel}</strong>
          </p>
          <p>
            <strong>{this.props.match.totalMinionsKilled}</strong> cs
          </p>
          <p>
            <strong>{this.props.match.averageMinonsKilled}</strong> cs/min
          </p>
        </div>
        <div className="col">
          <p>{this.props.match.item1.name}</p>
          <p>{this.props.match.item2.name}</p>
          <p>{this.props.match.item3.name}</p>
          <p>{this.props.match.item4.name}</p>
          <p>{this.props.match.item5.name}</p>
          <p>{this.props.match.item6.name}</p>  
        </div>
      </div>
    );

  }
}