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
      //todo objectify jsonString
      json: {}
    };
  }

  componentDidMount() {
    // var x = JSON.parse(this.props.jsonString);
  }

  props: Props;
  render() {
    return (
      <section id="current-result">
        {/*  */}
        {this.props.id}
        {/* {this.state.json} */}
      </section>
    );
  }
}
