'use client';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  useTheme
} from '@mui/material';
import validator from 'validator';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import LoadingButton from '@mui/lab/LoadingButton';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import { loginSetting } from '@/src/redux/auth.slice';
import { alertState, drawerSetting } from '@/redux/components.slice';
import { ICustomTheme } from '@/types/index';
import ReactCountryFlag from 'react-country-flag';

export default function LoginStep1() {
  const dispatch = useDispatch();
  const theme: ICustomTheme = useTheme();
  const authSlice = useSelector((state: any) => state.authSlice);
  const AlertSelector = useSelector((state: any) => state.componentsSlice);
  const phoneSlice = useSelector((state: any) => state.commonSlice);
  const { action } = authSlice;
  const router = useRouter();

  const loginAdmin = () => {
    dispatch(
      loginSetting({
        ...authSlice[action],
        loading: true
      })
    );
    if (
      authSlice[action].phone &&
      validator.isMobilePhone(
        `${phoneSlice.phone.current_code + authSlice[action].phone}`,
        'any',
        {
          strictMode: false
        }
      )
    ) {
      dispatch(
        loginSetting({
          ...authSlice[action],
          step: authSlice[action].step + 1,
          phone: phoneSlice.phone.current_code + authSlice[action].phone
        })
      );
    } else {
      dispatch(
        loginSetting({
          ...authSlice[action],
          loading: false
        })
      );
      dispatch(
        alertState({
          ...AlertSelector.alert,
          display: true,
          type: 'error',
          message: 'Please enter a valid WhatsApp number'
        })
      );
      dispatch(
        loginSetting({
          ...authSlice[action],

          phone: ''
        })
      );
    }
  };

  return (
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
            Please login to your account
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              gap: '20px'
            }}
          >
            <Box
              sx={{
                background: 'white',
                padding: '16px 15px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              onClick={() => {
                dispatch(drawerSetting('phoneListDrawer' as any));
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px'
                }}
                className='country-flag gap-2'
                onClick={() => {
                  dispatch(drawerSetting('phoneListDrawer ' as any));
                }}
              >
                <ReactCountryFlag
                  countryCode={phoneSlice.phone.current_flag}
                  svg
                />
                <HiOutlineChevronDown />
              </Box>
            </Box>
            <Box
              sx={{
                margin: '30px 0',
                width: '100%'
              }}
            >
              <TextField
                type='text'
                label='WhatsApp Number'
                onChange={event => {
                  dispatch(
                    loginSetting({
                      ...authSlice[action],
                      phone: event.target.value
                    })
                  );
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Box
                        sx={{
                          color: theme.palette.dark,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <FaWhatsapp />
                        <span
                          style={{
                            marginLeft: '4px',
                            fontSize: '16px'
                          }}
                        >
                          {phoneSlice.phone.current_code}
                        </span>
                      </Box>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Box>
          <LoadingButton
            loading={authSlice[action].loading}
            loadingPosition='end'
            endIcon={<MdOutlineKeyboardArrowRight />}
            variant='outlined'
            className='icon-right'
            onClick={loginAdmin}
          >
            <span>Next</span>
          </LoadingButton>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: 'fixed',
          bottom: 40,
          left: '50%',
          transform: 'translate(-50%,0)',
          width: '100%',
          cursor: 'pointer'
        }}
        onClick={() => {
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
          router.push('/register');
        }}
      >
        <Typography variant='h6' align='center'>
          Dont&apos;t have an account? <strong>Register</strong>
        </Typography>
      </Box>
    </Box>
  );
}
