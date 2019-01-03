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
      // decoded: Props.decoded
    };
  }

  deleteRow = (e, id) => {
    e.preventDefault();
    // log.info('id:' + id);

    var imports = [];
    if (ls.get('imports')) {
      imports = ls.get('imports');
    }

    var i = imports.findIndex(o => o.key === id);
    log.info(i);
    if (i !== -1) {
      imports = imports.splice(i, 1);
    }

    ls.set('imports', imports);
    //todo refresh component
    // or put imports into state to allow live-updating
  };

  render() {
    return (
      <tr>
        <td>
          <i class="fas fa-bars" />
        </td>
        <td>
          <i class="fas fa-chevron-down" />
        </td>
        <td>{this.props.decoded.name}</td>
        <td>{this.props.decoded.server}</td>
        <td>{this.props.decoded.region}</td>
        <td />
        <td>
          <a
            href="#"
            onClick={
              e => this.deleteRow(e, this.props.decoded.key) // onClick={this.deleteRow.bind(this, this.props.decoded.key)}
            }
            id={this.props.decoded.key}
          >
            <i class="fas fa-minus-circle" />
          </a>
        </td>
      </tr>
    );
  }
  componentDidMount() {}

  componentWillUnmount() {}
}
