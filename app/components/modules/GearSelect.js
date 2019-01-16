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
import objectFilter from '../../modules/ObjectFilter';

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
    this.state = { gear: [], searchQuery: '', displayedItems: [] };
  }
  props: Props;

  searchChange = async e => {
    var items = [];
    this.setState({ searchQuery: e.target.value, displayedItems: [] });
    if (e.target.value.length >= 3) {
      items = await this.searchDebounce();
      this.setState({ displayedItems: items });
    }
  };

  searchDebounce = () => AwesomeDebouncePromise(this.searchJson(), 1500);

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
          var filtered = data.filter(obj => {
            // log.info(obj.name);
            var name = obj.name;
            if (
              name &&
              name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
            ) {
              // log.info('Match: ' + name);
              return obj;
            }
          });
          log.info(filtered);

          this.setState({ displayedItems: filtered });
        }
      });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {}

  render() {
    return (
      <div id="gear-select">
        <h2>Select Gear</h2>
        <input
          type="search"
          id="search-autocomplete"
          className="dark-input form-control form-autocomplete"
          value={this.state.searchQuery}
          onChange={e => {
            this.searchChange(e);
          }}
        />
        <div>Results</div>
        <button className="btn background-colour-accent">Add</button>
      </div>
    );
  }

  componentWillUnmount() {
    this.setState = () => {};
  }
}
