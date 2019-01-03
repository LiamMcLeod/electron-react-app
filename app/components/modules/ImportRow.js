// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import log from 'electron-log';

type Props = {};

export default class ImportTable extends Component<Props> {
  props: Props;
  constructor(Props) {
    super(Props);
    // this.state = { decoded: this.decodeSimCInput() };
  }

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
          <i class="fas fa-minus-circle" />
        </td>
      </tr>
    );
  }
  componentDidMount() {}

  componentWillUnmount() {}
}
