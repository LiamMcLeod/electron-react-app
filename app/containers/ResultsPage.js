import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Components
import Result from '../components/Result';
//Redux: Profile
import * as ProfileActions from '../actions/profile';

function mapStateToProps(state) {
  // console.log(state);
  return {
    //* 1. From Types
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

//* This is presumably why it's innaccessible pre-Render()
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
