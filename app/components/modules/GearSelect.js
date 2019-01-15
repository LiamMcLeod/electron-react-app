import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import { getGearAsync } from '../../actions/gear';

import { List } from 'react-virtualized';
import VirtualizedSelect from 'react-virtualized-select';
//github.com/bvaughn/react-virtualized/blob/master/docs/List.md
//www.npmjs.com/package/JSONStream

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import fs from 'fs';

//* Components

import log from 'electron-log';

// type Props = {};
//   getGearAsync: () => void
// };

export default class GearSelect extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = { gear: [], searchQuery: '', searchValue: '' };
  }
  props: Props;

  searchChange = e => {
    // this.setState({ searchQuery: e.target.value });
    // var searchQuery = e.target.value.toLowerCase();
    // var displayedItems = this.props.state.gear.filter(function(o) {
    //   var searchQuery = o.name.toLowerCase();
    //   return searchValue.indexOf(searchQuery) !== -1;
    // });
    // this.setState({
    //   displayedItems: displayedItems
    // });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {
    getGearAsync();
  }

  render() {
    // const options = [
    //   { label: 'One', value: 1 },
    //   { label: 'Two', value: 2 },
    //   { label: 'Three', value: 3, disabled: true }
    // ];

    return (
      <div id="gear-select">
        <h2>Select Gear</h2>
        {/* <input
             onChange={e => {
               this.searchChange(e);
             }}
             value={this.searchQuery}
             className="dark-input"
           /> */}
      </div>
    );
  }
}
