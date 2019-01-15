import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Components
import Compare from '../components/GearCompare';
//Redux: Profile
import * as GearActions from '../actions/gear';

function mapStateToProps(state) {
  // console.log(state);
  return {
    //* 1. From Types
    equippableGear: state.gear
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GearActions, dispatch);
}

//* This is presumably why it's innaccessible pre-Render()
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compare);
