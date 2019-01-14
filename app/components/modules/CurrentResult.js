import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import { selectFile } from '../../actions/file';

//* Components

import log from 'electron-log';

type Props = {};
export default class CurrentResult extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = { json: {} };
  }
  props: Props;

  purifyString = string => {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    if (string.indexOf('_')) {
      string = string.split('_');
      string[1] = string[1].charAt(0).toUpperCase() + string[1].slice(1);
    }
    string = string[0] + ' ' + string[1];
    return string;
  };

  componentDidMount() {}

  render() {
    var player = this.props.json.sim.players[0];
    return (
      <section id="current-result">
        {/* <div
          className="card background-colour-box"
          style={{ width: 18 + 'rem' }}
        >
          <div className="card-body">
            <h5 className="card-title">
              DPS:
              {' ' +
                Math.round(
                  this.props.json.sim.players[0].collected_data.dps.mean
                )}
            </h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn background-colour-accent">
              Export
            </a>
          </div>
		</div> */}

        <div className="flex">
          {/* // style="box-sizing: border-box; display: flex; flex-wrap: wrap;
          align-items: flex-start; margin-bottom: 16px;" */}
          <div className="profile-image">
            <img
              className="inset-image"
              src="http://raidbots.com/wowapi/character/eu/kazzak/tetrodotoxin/image/inset"
            />

            <div />
          </div>
          <div className="info-container">
            <h1 className="player-name">{player.name}</h1>
            <h2 className="player-dps">
              {Math.round(player.collected_data.dps.mean)}
            </h2>
            <p className="player-other">
              {/* RACES */}
              {this.purifyString(player.race)}
              {' ' /* SPECS */}
              {player.specialization}
            </p>
            <p className="sim-type">Quick Sim</p>
          </div>
          <div className="Space" />
          {/* // style="box-sizing: border-box; display: inline-block; flex: 1 1
          auto; width: 10px;" */}
          {/* <div className="Flex" style="box-sizing: border-box; display: flex; flex-flow: column wrap; align-items: flex-end; justify-content: space-between;"> */}
          {/* <div className="Flex" style="box-sizing: border-box; display: flex;"> */}
          {/* <div className="Box" style="box-sizing: border-box; margin-right: 16px;"><a href="https://worldofwarcraft.com/en-gb/character/kazzak/tetrodotoxin" target="_blank" rel="noopener noreferrer" title="Tetrodotoxin on WoW Armory"><img src="/images/icon-wow.png" height="36" align="middle" alt=""></a></div> */}
          {/* <div className="Box" style="box-sizing: border-box; margin-right: 16px;"><a href="https://www.warcraftlogs.com/character/eu/kazzak/tetrodotoxin" target="_blank" rel="noopener noreferrer" title="Tetrodotoxin on Warcraft Logs"><img src="/images/icon-wcl.png" height="36" align="middle" alt=""></a></div> */}
          {/* <div className="Box" style="box-sizing: border-box;"><a href="https://raider.io/characters/eu/kazzak/tetrodotoxin" target="_blank" rel="noopener noreferrer" title="Tetrodotoxin on Raider.IO"><img src="/images/icon-raiderio.png" height="36" align="middle" alt=""></a></div> */}
          {/* </div> */}
          {/* </div> */}
        </div>

        {/*  */}
        {/* {this.props.id} */}
        {/* {Math.round(this.props.json.sim.players[0].collected_data.dps.mean)} */}
        {/* {this.state.json} */}
      </section>
    );
  }
}
