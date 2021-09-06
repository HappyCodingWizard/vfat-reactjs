import { createAction } from '@reduxjs/toolkit';
import { networkItemType } from 'data';

export const setNetworkAction = createAction<networkItemType | null>(
  'network/setNetwork'
);
