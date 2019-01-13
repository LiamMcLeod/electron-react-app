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
    this.state = {
      json: {}
    };
  }

  componentDidMount() {}

  props: Props;
  render() {
    return (
      <section id="current-result">
        {/*  */}
        {/* {this.props.id} */}
        {Math.round(this.props.json.sim.players[0].collected_data.dps.mean)}
        {/* {this.state.json} */}
      </section>
    );
  }
}
