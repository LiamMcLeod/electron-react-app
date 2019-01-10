import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Components
import Result from '../components/Result';
//Redux: File
import * as fileActions from '../actions/file';

function mapStateToProps(state) {
  if (!state.file.length) {
    state.file = '';
  }
  return {
    //* 1. From Types
    state: state,
    id: state.file
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(fileActions, dispatch);
}

//* This is presumably why it's innaccessible pre-Render()
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
