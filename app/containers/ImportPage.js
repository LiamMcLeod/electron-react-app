import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Import from '../components/Import';

type Props = {};

export default class ImportPage extends Component<Props> {
  props: Props;

  render() {
    return <Import />;
  }
}
