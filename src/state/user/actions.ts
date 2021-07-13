import { createAction } from '@reduxjs/toolkit';

export const updateMediaDarkMode = createAction<{ mediaDarkMode: boolean }>(
  'user/updateMediaDarkMode'
);
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>(
  'user/updateUserDarkMode'
);
