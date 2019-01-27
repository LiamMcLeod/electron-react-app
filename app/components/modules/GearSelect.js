import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import JSONStream from 'JSONStream';
import fs from 'fs';
import { List, AutoSizer } from 'react-virtualized';
import Select from 'react-virtualized-select';

import AwesomeDebouncePromise from 'awesome-debounce-promise';
//github.com/bvaughn/react-virtualized/blob/master/docs/List.md
//www.npmjs.com/package/JSONStream

import { getGearAsync } from '../../actions/gear';

import generateId from '../../modules/GenerateId';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

//* Components

import log from 'electron-log';

// type Props = {};
//   getGearAsync: () => void
// };

export default class GearSelect extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = { gear: [], searchQuery: '', displayedItems: [], toSim: [] };
  }
  props: Props;

  searchChange = async e => {
    var items = [];
    this.setState({
      searchQuery: e.target.value,
      displayedItems: []
    });
    if (e.target.value.length >= 3) {
      items = await this.searchDebounce();
      this.setState({ displayedItems: items });
    }
  };

  //  https: //github.com/slorber/awesome-debounce-promise
  searchDebounce = () => AwesomeDebouncePromise(this.searchJson(), 3500);

  searchJson = () => {
    //TODO alternative solution. This is pretty janky and slightly laggy due to 80,000 rows but it works.
    fetch('data/equippable-items.json')
      // fetch('data/testdata.json')
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(data => {
        var displayedItems = this.state.displayedItems;

        if (this.state.searchQuery) {
          var exists = {};
          var filtered = data.filter(obj => {
            // log.info(obj.name);
            var name = obj.name;
            if (
              name &&
              name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
            ) {
              var keys = Object.keys(exists);
              if (keys.length > 0 && exists.hasOwnProperty(obj.name)) {
              } else {
                exists[obj.name] = true;
                return obj;
              }
            }
          });

          // log.info(filtered);
          filtered = filtered.sort((objA, objB) => {
            return objB.itemLevel - objA.itemLevel;
          });
          this.setState({
            displayedItems: filtered
          });
        }
      });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  selectPiece = e => {
    e.preventDefault();
    //
  };

  componentDidMount() {}

  render() {
    if (this.state.searchQuery && this.state.displayedItems.length) {
      var rows = this.state.displayedItems.map((row, i) => {
        var itemQuality = '';
        switch (row.quality) {
          case 0:
            itemQuality = 'poor';
            break;
          case 1:
            itemQuality = 'common';
            break;
          case 2:
            itemQuality = 'uncommon';
            break;
          case 3:
            itemQuality = 'rare';
            break;
          case 4:
            itemQuality = 'epic';
            break;
          case 5:
            itemQuality = 'legendary';
            break;
          //todo see others for loom, legendary, artifact
        }
        // todo display icons
        //** Icon pack from https://barrens.chat/viewtopic.php?f=5&t=63&p=1726#p1726 */
        // "https://wow.zamimg.com/images/wow/icons/large/inv_misc_dice_02.jpg");
        return (
          <div className="displayed-item-row" key={generateId()}>
            <a
              onClick={e => {
                this.selectPiece(e);
              }}
              href="#"
              className={'displayed-item ' + itemQuality + '-item'}
            >
              <img
                src={`https://wow.zamimg.com/images/wow/icons/large/${
                  row.icon
                }.jpg`}
                height="24"
                width="24"
                // TODO MOVE TO CSS
              />{' '}
              {row.name}{' '}
            </a>
          </div>
        );
      });
    }

    return (
      <section id="gear-select">
        <h2>Select Gear</h2>
        <div className="form-row">
          <div className="col-auto">
            <div className="search-container">
              <input
                type="search"
                id="search-autocomplete"
                className="darker-input form-control form-autocomplete"
                value={this.state.searchQuery}
                onChange={e => {
                  this.searchChange(e);
                }}
              />
            </div>
            <div
              id="search-autocomplete-results"
              style={
                this.state.searchQuery
                  ? {
                      height: '150px', // width: '300px',
                      padding: '10px 12px',
                      border: '1px solid #000'
                    }
                  : { border: '0', padding: '0' }
              }
            >
              {this.state.searchQuery.length > 0 ? (
                this.state.displayedItems.length ? (
                  rows
                ) : (
                  <div className="loader" />
                )
              ) : null}
            </div>
          </div>
          <div className="col-auto">
            <button className="btn background-colour-accent">Add</button>
          </div>
        </div>
      </section>
    );
  }

  componentWillUnmount() {
    this.setState = () => {};
  }
}
