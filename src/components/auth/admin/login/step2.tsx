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

import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

import LoadingButton from '@mui/lab/LoadingButton';
import { HiOutlineKey } from 'react-icons/hi';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from 'next-auth/react';

import { adminAPIs } from '@/src/services/admin';
import { loginSetting } from '@/src/redux/auth.slice';
import { alertState } from '@/redux/components.slice';

export default function LoginStep2() {
  const dispatch = useDispatch();
  const authSlice = useSelector((state: any) => state.authSlice);
  const AlertSelector = useSelector((state: any) => state.componentsSlice);
  const commonSlice = useSelector((state: any) => state.commonSlice);
  const domain = commonSlice.domain.name;
  const { action } = authSlice;
  const handleClickShowPassword = () => {
    dispatch(
      loginSetting({
        ...authSlice[action],
        show_password: !authSlice[action].show_password
      })
    );
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
  const onSubmit = async () => {
    try {
      dispatch(
        loginSetting({
          ...authSlice[action],
          loading: true
        })
      );
      const res = await signIn('admin-login', {
        redirect: false,
        phone: authSlice[action].phone,
        password: authSlice[action].password,
        domain,
        callbackUrl
      });

      dispatch(
        loginSetting({
          ...authSlice[action],
          loading: false
        })
      );
      if (!res?.error) {
        router.push(callbackUrl);
        dispatch(
          loginSetting({
            ...authSlice[action],
            phone: '',
            password: '',
            step: 0,
            show_password: false,
            loading: false
          })
        );
      } else {
        const jsonResponse: {
          status: number;
          errors: string;
        } = JSON.parse(res?.error);
        if (jsonResponse.status == 201) {
          dispatch(
            alertState({
              ...AlertSelector.alert,
              display: true,
              type: 'success',
              message: 'Login Successfully!'
            })
          );
        } else {
          dispatch(
            alertState({
              ...AlertSelector.alert,
              display: true,
              type: 'error',
              message: 'Credentials Not Correct'
            })
          );
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getPhoneCode = async () => {
    try {
      dispatch(
        loginSetting({
          ...authSlice[action],
          loading: true
        })
      );
      const res = adminAPIs(null);
      const response = await res?.sendCode({
        identity: authSlice[action].phone,
        action: 'forgot-password-phone-code',
        type: 'phone'
      });
      if (response?.data.is_success && response?.status === 200) {
        dispatch(
          loginSetting({
            ...authSlice[action],
            phone: '',
            password: '',
            step: 0,
            show_password: false,
            loading: false
          })
        );
        router.push(
          `/admin/auth/forgot-password?phone=${authSlice[action].phone}&expire_date=${response.data.data.expired}&country_code=${commonSlice.phone.current_code}`
        );
      } else {
        dispatch(
          alertState({
            ...AlertSelector.alert,
            display: true,
            type: 'error',
            message: response?.data?.message[0]?.msg
          })
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent='center'
          sx={{
            mt: '50px'
          }}
        >
          <Grid item md={12} xs={12}>
            <Typography variant='h2' align='center'>
              Welcome Back
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
                    loginSetting({
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
            </Box>
            <LoadingButton
              loading={authSlice[action].loading}
              loadingPosition='end'
              endIcon={<MdOutlineKeyboardArrowRight />}
              variant='outlined'
              className='icon-right'
              onClick={() => {
                if (authSlice[action].password) {
                  onSubmit();
                } else {
                  dispatch(
                    alertState({
                      ...AlertSelector.alert,
                      display: true,
                      type: 'error',
                      message: 'Please Enter Password'
                    })
                  );
                }
              }}
            >
              <span>Next</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 40,
          left: '50%',
          transform: 'translate(-50%,0)',
          width: '100%',
          cursor: 'pointer'
        }}
        onClick={getPhoneCode}
      >
        <Typography variant='h6' align='center'>
          <strong>
            <LoadingButton loading={authSlice[action].loading} variant='text'>
              Forget Password?
            </LoadingButton>
          </strong>
        </Typography>
      </Box>
    </>
  );
}
