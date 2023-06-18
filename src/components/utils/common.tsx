'use client';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';

import { changeAction } from '@/src/redux/auth.slice';

export const ChangeAuthReduxAction = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  console.log(pathname);
  if (pathname.includes('/login')) {
    dispatch(changeAction('login' as any));
  } else if (pathname.includes('/register')) {
    dispatch(changeAction('register' as any));
  } else if (pathname.includes('/forget-password')) {
    dispatch(changeAction('forget_password' as any));
  }
  return null;
};
