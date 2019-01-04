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
      decoded: Props.decoded,
      renderRow: true
    };
  }

  deleteRow = (e, id) => {
    this.setState({ renderRow: false });
    e.preventDefault();
    // log.info('id:' + id);

    var imports = [];
    if (ls.get('imports')) {
      imports = ls.get('imports');
    }

    var i = imports.findIndex(o => o.key === id);
    if (i !== -1) {
      imports = imports.splice(i, 1);
    }

    ls.set('imports', imports);
  };

  render() {
    if (this.state.renderRow) {
      return (
        <tr>
          <td>
            <i class="fas fa-bars" />
          </td>
          <td>
            <i class="fas fa-chevron-down" />
            {/* <i class="fas fa-chevron-up" /> */}
          </td>
          <td>{this.state.decoded.name}</td>
          <td>{this.state.decoded.server}</td>
          <td>{this.state.decoded.region}</td>
          <td />
          <td>
            <a
              href="#"
              onClick={
                e => this.deleteRow(e, this.state.decoded.key) // onClick={this.deleteRow.bind(this, this.props.decoded.key)}
              }
              id={this.state.decoded.key}
            >
              <i class="fas fa-minus-circle" />
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
