// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import ls from 'local-storage';

import log from 'electron-log';

type Props = {};

export default class ImportTable extends Component<Props> {
  props: Props;
  constructor(Props) {
    super(Props);
    this.state = {
      row: Props.row,
      renderRow: true,
      selectable: Props.selectable
    };
  }

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

  getKey = () => {
    return this.props.row.key;
  };

  deleteRow = (e, id) => {
    this.setState({ renderRow: false });
    e.preventDefault();
    // log.info('id:' + id);

    var profiles = [];
    if (ls.get('profiles')) {
      profiles = ls.get('profiles');
    }

    var i = profiles.findIndex(o => o.key === id);
    if (i !== -1) {
      profiles.splice(i, 1);
    }
    // log.info(profiles);
    ls.set('profiles', profiles);
  };

  static getDerivedStateFromProps(Props) {
    return null;
  }

  render() {
    if (this.state.renderRow) {
      return (
        <tr
          onClick={e => {
            this.state.selectable
              ? this.props.selectRow(e, this.state.row.key)
              : this.props.selectRow(e); //  & (this.state.row.key !== this.state.selected)
          }}
          style={{
            background: this.state.selected ? 'rgba(255, 255, 255, 0.5)' : null
          }}
        >
          <td>
            <i className="fas fa-bars" />
          </td>
          <td>
            <i className="fas fa-chevron-down" />
            {/* <i className="fas fa-chevron-up" /> */}
          </td>
          <td>
            {/* {this.state.row.name} */}
            {this.getNameFromRow(this.state.row)}
          </td>
          <td>
            {/* {this.state.row.server} */}
            {this.getServerFromRow(this.state.row)}
          </td>
          <td>
            {/* {this.state.row.region} */}
            {this.getRegionFromRow(this.state.row)}
          </td>
          <td />
          <td>
            <a
              href="#"
              onClick={e => this.deleteRow(e, this.props.row.key)}
              id={this.props.row.key}
            >
              <i className="fas fa-minus-circle" />
            </a>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }
  componentDidMount() {}

  componentWillUnmount() {}
}
