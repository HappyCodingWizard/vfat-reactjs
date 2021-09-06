import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  }, [dispatch]);

  return null;
}
