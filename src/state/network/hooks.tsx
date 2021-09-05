import { networkItemType } from 'data'
import { useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'state'

import { setNetworkAction } from './actions'

export function useNetwork (): [
  networkItemType | null,
  (network: networkItemType | null) => void
] {
  const dispatch = useDispatch<AppDispatch>()
  const { network } = useSelector<AppState, { network: networkItemType | null }>(
    ({ network }) => network,
    shallowEqual
  )

  const setNetwork = useCallback(
    (network: networkItemType | null) => {
      dispatch(setNetworkAction(network))
    },
    [dispatch]
  )

  return [network, setNetwork]
}
