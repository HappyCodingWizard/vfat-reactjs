import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from 'state';
import { updateUserDarkMode } from './actions';

export function useIsDarkMode(): boolean {
  const { userDarkMode, mediaDarkMode } = useSelector<
    AppState,
    { userDarkMode: boolean | null; mediaDarkMode: boolean }
  >(
    ({ user: { mediaDarkMode, userDarkMode } }) => ({
      userDarkMode,
      mediaDarkMode
    }),
    shallowEqual
  );

  return userDarkMode === null ? mediaDarkMode : userDarkMode;
}

export function useDarkModeManager(): [boolean, (darkMode: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useIsDarkMode();

  const setDarkMode = useCallback(
    (darkMode: boolean) => {
      dispatch(updateUserDarkMode({ userDarkMode: darkMode }));
    },
    [dispatch]
  );

  return [darkMode, setDarkMode];
}
