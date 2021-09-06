import { createReducer } from '@reduxjs/toolkit';

import { updatePoolInfoAction, emptyPoolInfoAction, setTokenAction } from './actions';

export interface PoolState {
  pool: any[]
  token: string
}

export const initialState: PoolState = {
  pool: [],
  token: ''
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updatePoolInfoAction, (state, action) => {
      state.pool = [...state.pool, action.payload];
    })
    .addCase(emptyPoolInfoAction, (state, action) => {
      state.pool = [];
    })
    .addCase(setTokenAction, (state, action) => {
      state.token = action.payload
    })
);
