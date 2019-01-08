import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Components
import Quick from '../components/QuickSim';
//Redux: Profile
import * as ProfileActions from '../actions/profile';

function mapStateToProps(state) {
  return {
    //* 1. From Types
    state: state,
    profiles: state.profiles.profiles,
    selected: state.profiles.selected
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

//* This is presumably why it's innaccessible pre-Render()
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quick);
