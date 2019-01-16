import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import fs from 'fs';

import domToImage from 'dom-to-image';
import FileSaver from 'file-saver';

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

  exportPng = e => {
    var html = document.getElementById('character-info');
    var player = this.props.json.sim.players[0];
    domToImage.toBlob(html).then(blob => {
      //
      FileSaver.saveAs(blob, 'output.png');
    });
  };

  exportHtml = e => {
    //TODO FINISH MAYBE EXPORT TO IMAGE TOO??
    var player = this.props.json.sim.players[0];
    var css = `
	body {
    	font-family: Helvetica, Helvetica Neue, Lato, Arial, sans-serif;
    	position: relative;
    	color: #eeeeee;
    	height: 100vh;
    	width: 100%;
    	background-color: #333339;
		overflow-x: hidden;
	}
	main #current-result {
	  box-sizing: border-box;
	  padding: 10px 20px;
	}

	main #current-result .profile-image {
	  box-sizing: border-box;
	  display: flex;
	  margin-bottom: 0px;
	  padding-left: 10px;
	  border-left: 5px solid rgb(255, 245, 105);
	  height: 116px;
	  width: 265px;
	}

	main #current .inset-image {
	  flex: 0 0 auto;
	  max-width: none;
	  margin-right: 20px;
	  margin-left: 0px;
	}
	main #current-result .player-name {
	  box-sizing: border-box;
	  font-size: 32px;
	  font-weight: 600;
	  line-height: 1.25;
	  margin: 0px;
	  letter-spacing: 0.2em;
	}

	main #current-result .player-dps {
	  color: rgb(255, 187, 51);
	  box-sizing: border-box;
	  font-size: 24px;
	  font-weight: 600;
	  line-height: 1.25;
	  margin: 0px;
	  text-transform: uppercase;
	  letter-spacing: 0.2em;
	}

	main #current-result .player-other {
	  box-sizing: border-box;
	  font-size: 16px;
	  margin: 0px;
	  opacity: 0.875;
	}

	main #current-result .sim-type {
	  box-sizing: border-box;
	  font-size: 16px;
	  margin: 8px 0 0 0;
	  opacity: 0.875;
	}

	main #current-result .info-container {
	  box-sizing: border-box;
	  margin-left: 15px;
	}`;

    var html = `
	<html>
		<head>
			<title> Sim Results </title>
			<style>
				${css}
			</style>
		</head>
		<body>
			<main>
				<section id="current-result">
					<div class="flex">
						<div class="profile-image">
							<img
							class="inset-image"
							src="http://raidbots.com/wowapi/character/eu/kazzak/tetrodotoxin/image/inset"
							/>
						<div />
					</div>
					<div class="info-container">
						<h1 class="player-name">${player.name}</h1>
						<h2 class="player-dps">
						${Math.round(player.collected_data.dps.mean)}
						</h2>
						<p class="player-other">
						${this.purifyString(player.race) + ' '}
						${player.specialization}
						</p>
						<p class="sim-type">${this.getSimType(this.props.id)}</p>
					</div>
				</section>
			</main>
		</body>
	</html>
	`;
    fs.writeFile(__dirname + '\\tmp\\output.html', html, 'utf8', err => {
      if (err) throw err;
      console.log('DONE!');
    });
  };

  getSimType = id => {
    var prefix = id.charAt(0) + '' + id.charAt(1);
    switch (prefix) {
      case 'QS':
        return 'Quick Sim';
      case 'GC':
        return 'Gear Comparison';
      default:
        return 'Quick Sim';
    }
  };

  componentDidMount() {}

  render() {
    var player = this.props.json.sim.players[0];
    return (
      <section id="current-result" className="flex">
        <div id="character-info">
          <div className="flex">
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
              <p className="sim-type">{this.getSimType(this.props.id)}</p>
            </div>
          </div>
        </div>
        <div className="flex spacer" />
        <div className="flex right-buttons">
          <div className="button-right">
            <a
              onClick={e => {
                this.exportHtml(e);
              }}
              className="btn background-colour-accent button-right"
            >
              Export HTML
            </a>
            <a
              onClick={e => {
                this.exportPng(e);
              }}
              className="btn background-colour-accent button-right"
            >
              Export PNG
            </a>
          </div>
        </div>
      </section>
    );
  }

  componentWillUnmount() {
    this.setState = () => {};
  }
}
