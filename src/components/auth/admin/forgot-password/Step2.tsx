'use client';
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  IconButton
} from '@mui/material';

import { HiOutlineKey, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import PasswordStrengthBar from 'react-password-strength-bar';
import PasswordChecklist from 'react-password-checklist';
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

import { alertState } from '@/redux/components.slice';
import { forgetSetting } from '@/src/redux/auth.slice';
import styles from '@/styles/Login.module.scss';
import { adminAPIs } from '@/src/services/admin';
import LoadingButton from '@mui/lab/LoadingButton';
export default function ForgetPasswordStep2() {
  const dispatch = useDispatch();
  const authSlice = useSelector((state: any) => state.authSlice);
  const AlertSelector = useSelector((state: any) => state.componentsSlice);
  const { action } = authSlice;

  const router = useRouter();
  const handleClickShowPassword = () => {
    dispatch(
      forgetSetting({
        ...authSlice[action],
        show_password: !authSlice[action].show_password
      })
    );
  };
  const resetPassword = async () => {
    try {
      dispatch(
        forgetSetting({
          ...authSlice[action],
          loading: true
        })
      );
      if (authSlice[action].phone) {
        const res = adminAPIs('');
        const response = await res?.resetPassword({
          type: 'phone',
          identity: authSlice[action].country_code + authSlice[action].phone,
          action: 'register-code-verify-phone',
          code: authSlice[action].code,
          password: authSlice[action].password
        });
        dispatch(
          forgetSetting({
            ...authSlice[action],
            loading: false
          })
        );
        if (response?.data.is_success && response?.status === 200) {
          dispatch(
            alertState({
              ...AlertSelector.alert,
              display: true,
              type: 'success',
              message: 'Password has been changed successfully'
            })
          );
          router.push('/login');
        } else {
          dispatch(
            alertState({
              ...AlertSelector.alert,
              display: true,
              type: 'error',
              message: response?.data.message
            })
          );
        }
      } else {
        dispatch(
          alertState({
            ...AlertSelector.alert,
            display: true,
            type: 'error',
            message: 'phone number is missing'
          })
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent='center'
        sx={{
          marginTop: '50px'
        }}
      >
        <Grid item md={7} xs={12}>
          <Typography variant='h2' align='center'>
            Forget Password
          </Typography>
          <Typography variant='body1' align='center'>
            Please enter your password for logging
            <br />
            into your account
          </Typography>
          <Box
            sx={{
              margin: '30px 0'
            }}
          >
            <TextField
              type={authSlice[action].show_password ? 'text' : 'password'}
              label='Password'
              value={authSlice[action].password}
              onChange={event => {
                dispatch(
                  forgetSetting({
                    ...authSlice[action],
                    password: event.target.value
                  })
                );
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <HiOutlineKey />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {authSlice[action].show_password ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {authSlice[action].password && (
              <>
                <PasswordStrengthBar
                  style={{ margin: '20px 0 0' }}
                  className={` ${styles['password-validator']}`}
                  password={authSlice[action].password}
                />
                <PasswordChecklist
                  rules={['minLength', 'specialChar', 'number', 'capital']}
                  minLength={8}
                  value={authSlice[action].password}
                  className={` ${styles['password-validator']}`}
                />
              </>
            )}
          </Box>
          <LoadingButton
            loading={authSlice[action].loading}
            loadingPosition='end'
            endIcon={<HiOutlineOfficeBuilding />}
            variant='outlined'
            className='icon-right'
            onClick={resetPassword}
          >
            <span>Confirm</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
