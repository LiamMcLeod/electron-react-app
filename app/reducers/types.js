import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type profileStateType = {
  //* 1. States that are parsed to 1. In ImportPage.js
  +profiles: Array,
  +profile: Object,
  +selected: String
};

export type fileStateType = {
  +id: String,
  +file: Object,
  +files: Array
};

export type gearStateType = {
  equippableGear: Array
};

export type Action = {
  +type: String
};

// export type GetState = () => profileStateType;

export type GetState = () => [profileStateType, fileStateType];

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
