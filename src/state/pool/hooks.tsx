import { useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'state'
import { setTokenAction, updatePoolInfoAction } from './actions'

export function usePool(): [
  any,
  (pool: any) => void
] {
  const dispatch = useDispatch<AppDispatch>()
  const { pool } = useSelector<AppState, { pool: any }>(
    ({ pool }) => pool,
    shallowEqual
  )

  const updatePoolInfo = useCallback(
    (pool: any) => {
      dispatch(updatePoolInfoAction(pool))
    },
    [dispatch]
  )

  return [pool, updatePoolInfo]
}

export function usePoolToken(): [
  string,
  (pool: string) => void
] {
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useSelector<AppState, { token: string }>(
    ({ pool }) => pool,
    shallowEqual
  )

  const setToken = useCallback(
    (token: string) => {
      dispatch(setTokenAction(token))
    },
    [dispatch]
  )

  return [token, setToken]
}
