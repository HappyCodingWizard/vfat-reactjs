import { createReducer } from '@reduxjs/toolkit';

import { updateMediaDarkMode, updateUserDarkMode } from './actions';

const currentTimestamp = () => new Date().getTime();

export const DARK_MODE_LOCALSTORAGE_KEY = 'user/dark_mode';
export interface UserState {
  lastUpdateVersionTimestamp?: number;
  userDarkMode: boolean | null; // the user's choice for dark mode or light mode
  mediaDarkMode: boolean; // whether the dark mode media query matches
  timestamp: number;
}

export const initialState: UserState = {
  userDarkMode: null,
  mediaDarkMode: false,
  timestamp: currentTimestamp()
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateUserDarkMode, (state, action) => {
      localStorage.setItem(
        DARK_MODE_LOCALSTORAGE_KEY,
        action.payload.userDarkMode ? '1' : '0'
      );

      state.userDarkMode = action.payload.userDarkMode;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateMediaDarkMode, (state, action) => {
      state.mediaDarkMode = action.payload.mediaDarkMode;
      state.timestamp = currentTimestamp();
    })
);
