import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'state';
import { updateMediaDarkMode, updateUserDarkMode } from './actions';
import { DARK_MODE_LOCALSTORAGE_KEY } from './reducer';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userExistingDarkMode = Number(
      localStorage.getItem(DARK_MODE_LOCALSTORAGE_KEY)
    );

    dispatch(
      updateUserDarkMode({ userDarkMode: Boolean(userExistingDarkMode) })
    );

    const darkHandler = (match: MediaQueryListEvent) => {
      dispatch(updateMediaDarkMode({ mediaDarkMode: match.matches }));
    };

    const match = window?.matchMedia('(prefers-color-scheme: dark)');

    dispatch(updateMediaDarkMode({ mediaDarkMode: match.matches }));

    if (match?.addListener) {
      match?.addListener(darkHandler);
    } else if (match?.addEventListener) {
      match?.addEventListener('change', darkHandler);
    }

    return () => {
      if (match?.removeListener) {
        match?.removeListener(darkHandler);
      } else if (match?.removeEventListener) {
        match?.removeEventListener('change', darkHandler);
      }
    };
  }, [dispatch]);

  return null;
}
