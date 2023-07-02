'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import {
  loginSetting,
  registerSetting,
  forgetSetting,
} from '@/src/redux/auth.slice';

export default function AuthNavigationHeader() {
  const dispatch = useDispatch();
  const authSlice = useSelector((state: any) => state.authSlice);
  const { action } = authSlice;
  function dispatchAuthAction() {
    if (action == 'login') {
      dispatch(
        loginSetting({
          ...authSlice[action],
          step: authSlice[action].step - 1
        })
      );
    } else if (action == 'register') {
      dispatch(
        registerSetting({
          ...authSlice[action],
          step: authSlice[action].step - 1
        })
      );
    } else if (action == 'forgot_password') {
      dispatch(
        forgetSetting({
          ...authSlice[action],
          step: authSlice[action].step - 1
        })
      );
    } 
  }
  return (
    <>
      {authSlice[action].step ? (
        <MdOutlineKeyboardArrowLeft
          className='back-btn'
          onClick={() => {
            dispatchAuthAction();
          }}
        />
      ) : null}
    </>
  );
}
