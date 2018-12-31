import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Quick from '../components/QuickSim';

type Props = {};

export default class QuickSimPage extends Component<Props> {
  props: Props;

  render() {
    return <Quick />;
  }
}
