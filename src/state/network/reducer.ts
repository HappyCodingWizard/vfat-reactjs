import { createReducer } from '@reduxjs/toolkit';
import { networkItemType } from 'data';

import { setNetworkAction } from './actions';

export interface NetworkState {
  network: networkItemType | null
}

export const initialState: NetworkState = {
  network: null
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setNetworkAction, (state, action) => {
      state.network = action.payload;
    })
);
