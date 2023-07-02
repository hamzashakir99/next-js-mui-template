'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import {
  changeAction,
  forgetSetting,
  registerSetting
} from '@/src/redux/auth.slice';

export const ChangeAuthReduxAction = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  useEffect(() => {
    function setAuthReduxAction() {
      if (pathname.includes('/login')) {
        dispatch(changeAction('login' as any));
      } else if (pathname.includes('/register')) {
        dispatch(changeAction('register' as any));
      } else if (pathname.includes('/forgot-password')) {
        dispatch(changeAction('forgot_password' as any));
      }
    }
    setAuthReduxAction();
  }, [dispatch, pathname]);
  return null;
};

export const ChangeForgotAuthSearchParams = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const router = useRouter();
  const country_code = params.get('country_code');
  const phone = params.get('phone');
  const expire_date = params.get('expire_date');

  useEffect(() => {
    function setAuthSearchParams() {
      if (!phone || !expire_date || !country_code) {
        router.push('/admin/auth/login');
      } else {
        dispatch(
          forgetSetting({
            phone: phone.replace(country_code, '').trim(),
            country_code: `+${country_code?.trim()}`,
            expire_date,
            password: '',
            step: 0,
            show_password: false,
            loading: false
          } as any)
        );
      }
    }
    setAuthSearchParams();
  }, [dispatch, router, phone, expire_date, country_code]);
  return null;
};

export const ActivationCodeSearchParams = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const router = useRouter();
  const phone = params.get('phone');
  const expire_date = params.get('expire_date');
  const country_code: string | null = params.get('country_code');
  useEffect(() => {
    function setAuthSearchParams() {
      if (!phone || !expire_date) {
        router.push('/register');
      } else {
        dispatch(
          registerSetting({
            phone: phone.replace(country_code || '+92', '').trim(),
            expire_date,
            country_code: `+${country_code?.trim()}`,
            name: '',
            password: '',
            step: 0,
            show_password: false,
            enable_password_button: false,
            enable_edit_button: false,
            code: '',
            loading: false
          } as any)
        );
      }
    }
    setAuthSearchParams();
  }, [dispatch, router, phone, expire_date, country_code]);
  return null;
};


