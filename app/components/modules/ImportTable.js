// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import ls from 'local-storage';
//* Components
import ImportRow from './ImportRow';

import log from 'electron-log';

type Props = {};
export default class ImportTable extends Component<Props> {
  // TODO Each child in an array or iterator should have a unique "key" prop.
  constructor(Props) {
    super(Props);
    this.state = { profiles: Props.profiles, selectable: false, selected: '' };

    if (Props.selectable) {
      this.state.selectable = Props.selectable;
    } else {
      this.state.selectable = false;
    }
  }
  props: Props;

  getNameFromRow = row => {
    var input = row.string;
    input = input.split('\n');

    var name = input[1].split('=');
    //* Strip Quotes
    name = name[1];
    name = name.substring(1, name.length - 1);
    return name;
  };

  getRegionFromRow = row => {
    var input = row.string;
    input = input.split('\n');

    var region = input[4].split('=');
    //* Make uppercase
    region = region[1];
    region = region.toUpperCase();

    return region;
  };

  getServerFromRow = row => {
    var input = row.string;
    input = input.split('\n');

    var server = input[5].split('=');
    //* Capitalise first letter
    server = server[1];
    server = server.charAt(0).toUpperCase() + server.slice(1);
    return server;
  };

  refreshRows = ignore => {
    // log.info('refresh called');
    // this.setState({ refreshRows: !this.state.refreshRows });
    return ignore;
  };

  selectRow = (e, id) => {
    // console.log(this);
    if (this.state.selectable) {
      // this.props.refreshRows(this.state.decoded.key);
      this.setState({ selected: id });
      log.info('Selected: ' + this.state.selected);

      //TODO ADJUST STYLE
      return null;
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.profiles) {
      return { profiles: nextProps.profiles };
    }
  }

  componentDidMount() {
    // var decoded = this.getBasicSimCData();
  }

  render() {
    // console.log(this.state.profiles);
    if (this.state.profiles) {
      var rows = this.state.profiles.map((row, i) => {
        // TODO add DELETE row ACTION TO REDUX
        // log.info(row.string);
        return (
          <ImportRow
            selectable={this.state.selectable}
            key={row.key}
            simC=""
            row={row}
            refreshRows={this.refreshRows}
            selectRow={this.selectRow}
          />
        );
      });
    }

    return (
      <div id="imports-table" className="padding-top-40">
        {/* {log.info(this.state.selectable)} */}
        {/* {log.info(this.props.imports)} */}
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col" colSpan="2" />
              <th scope="col">Name</th>
              <th scope="col">Server</th>
              <th scope="col">Region</th>
              <th scope="col" colSpan="2" />
            </tr>
          </thead>
          <tbody>{this.state.profiles ? rows : null}</tbody>
        </table>
      </div>
    );
  }

  componentWillUnmount() {}
}
