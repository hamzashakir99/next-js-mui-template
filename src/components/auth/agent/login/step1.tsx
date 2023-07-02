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
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import LoadingButton from '@mui/lab/LoadingButton';
import { AiOutlineUser } from 'react-icons/ai';

import { useSelector, useDispatch } from 'react-redux';

import { loginSetting } from '@/src/redux/auth.slice';
import { alertState } from '@/redux/components.slice';
import { ICustomTheme } from '@/types/index';

export default function LoginStep1() {
  const dispatch = useDispatch();
  const theme: ICustomTheme = useTheme();
  const authSlice = useSelector((state: any) => state.authSlice);
  const AlertSelector = useSelector((state: any) => state.componentsSlice);

  const { action } = authSlice;
  const loginAgent = () => {
    dispatch(
        loginSetting({
          ...authSlice[action],
          loading: true
        })
      );
    if (authSlice[action].user_name != "") {
        dispatch(
            loginSetting({
              ...authSlice[action],
              step: authSlice[action].step + 1,
            })
          );
    } 
    else {
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
            message: 'Please enter username'
          })
        );
        dispatch(
          loginSetting({
            ...authSlice[action],
            user_name: ''
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
                margin: '30px 0',
                width: '100%'
              }}
            >
              <TextField
                type='text'
                label='Username'
                onChange={event => {
                  dispatch(
                    loginSetting({
                      ...authSlice[action],
                      user_name: event.target.value
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
                        <AiOutlineUser />
                       
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
            onClick={loginAgent}
          >
            <span>Next</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
