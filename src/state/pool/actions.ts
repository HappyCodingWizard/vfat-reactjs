import { createAction } from '@reduxjs/toolkit';

export const updatePoolInfoAction = createAction<any>(
  'pool/updatePoolInfoAction'
);

export const emptyPoolInfoAction = createAction(
  'pool/emptyPoolInfoAction'
);

export const setTokenAction = createAction<string>(
  'pool/setTokenAction'
)
