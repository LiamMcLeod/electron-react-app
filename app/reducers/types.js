import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type profileStateType = {
  //* 1. States that are parsed to 1. In ImportPage.js
  +profile: Array,
  +profile: Object
};

export type Action = {
  +type: string
};

export type GetState = () => profileStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
