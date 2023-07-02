'use client';
import React, { useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  useTheme
} from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PinInput from 'react-pin-input';
import moment from 'moment';


import {
  alertState,
  drawerSetting,
  setBackdrop
} from '@/redux/components.slice';
import { ICustomTheme } from '@/types/index';
import { forgetSetting } from '@/src/redux/auth.slice';
import styles from '@/styles/Login.module.scss';
import { adminAPIs } from '@/src/services/admin';

import ReactCountryFlag from 'react-country-flag';
export default function ForgetPasswordStep1() {
  const dispatch = useDispatch();
  const authSlice = useSelector((state: any) => state.authSlice);
  const AlertSelector = useSelector((state: any) => state.componentsSlice);
  const commonSlice: any = useSelector((state: any) => state.commonSlice);
  const domain = commonSlice.domain.name;
  const { action } = authSlice;
  const theme: ICustomTheme = useTheme();

  const handleNext = () => {
    dispatch(
      forgetSetting({
        ...authSlice[action],
        step: authSlice[action].step + 1
      })
    );
  };
  const checkCodeToNext = async (codes: string) => {
    try {
      dispatch(
        setBackdrop({
          ...AlertSelector.backdrop,
          value: true
        })
      );
      if (authSlice[action].phone) {
        const res = adminAPIs('');
        const response = await res?.verifyCode({
          type: 'phone',
          action: 'code-verify-phone',
          identity: authSlice[action].country_code + authSlice[action].phone,
          code: codes,
          password: authSlice[action].country_code + authSlice[action].password,
          domain
        });
        dispatch(
          setBackdrop({
            ...AlertSelector.backdrop,
            value: false
          })
        );
        if (response?.data.is_success && response?.status === 200) {
          handleNext();
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
            message: 'No Phone'
          })
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const resendCode = async () => {
    try {
      dispatch(
        setBackdrop({
          ...AlertSelector.backdrop,
          value: true
        })
      );
      if (authSlice[action].phone) {
        const res = adminAPIs('');
        const response = await res?.sendCode({
          identity: authSlice[action].country_code + authSlice[action].phone,
          action: 'forgot-password-phone-code',
          type: 'phone'
        });
        dispatch(
          setBackdrop({
            ...AlertSelector.backdrop,
            value: false
          })
        );
        if (response?.data.is_success && response?.status === 200) {
          dispatch(
            alertState({
              ...AlertSelector.alert,
              display: true,
              type: 'success',
              message: 'Code has been sent Successfully'
            })
          );
          dispatch(
            forgetSetting({
              ...authSlice[action],
              expire_date: response.data.data.expired
            })
          );
        } else {
          dispatch(
            alertState({
              ...AlertSelector.alert,
              display: true,
              type: 'error',
              message: response?.data.message[0].msg
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

  const Countdown = useCallback(() => {
    return (
      <Box className={`${styles['resend-countdown']}`}>
        <svg
          style={{
            width: '0',
            height: '0'
          }}
        >
          <defs>
            <linearGradient id='your-unique-id' x1='1' y1='0' x2='0' y2='0'>
              <stop offset='5%' stopColor={theme.palette.greenish} />
              <stop offset='95%' stopColor={theme.palette.blue} />
            </linearGradient>
          </defs>
        </svg>
        <CountdownCircleTimer
          isPlaying
          duration={
            moment(authSlice[action].expire_date).diff(moment(), 'seconds') <= 0
              ? 0
              : moment(authSlice[action].expire_date).diff(moment(), 'seconds')
          }
          colors='url(#your-unique-id)'
          onComplete={() => {
            dispatch(
              forgetSetting({
                ...authSlice[action],
                enable_edit_button: true,
                expire_date: moment('2022-06-23T15:36:24.000Z').diff(
                  moment(),
                  'seconds'
                )
              })
            );
            return { shouldRepeat: false, delay: 1 };
          }}
        >
          {({ remainingTime }) => {
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </Box>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSlice[action].expire_date]); //done
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
        <Grid item md={12} xs={12}>
          <Typography variant='h2' align='center'>
            Verification
          </Typography>
          <Typography variant='body1' align='center'>
            Help us to verify your login
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
                  countryCode={commonSlice.phone.current_flag}
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
                disabled={!authSlice[action].enable_edit_button}
                type='text'
                label='WhatsApp Number'
                value={authSlice[action].phone}
                onChange={event => {
                  dispatch(
                    forgetSetting({
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
                          {commonSlice.phone.current_code}
                        </span>
                      </Box>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <MdEdit
                        onClick={() => {
                          dispatch(
                            forgetSetting({
                              ...authSlice[action],
                              enable_edit_button: true
                            })
                          );
                        }}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Box>

          <Typography variant='body1' align='center'>
            We have sent a verification code successfully to the registered
            WhatsApp number, please enter the code below:
          </Typography>
          <Box
            className='number-input'
            sx={{
              mt: '20px'
            }}
          >
            <PinInput
              length={4}
              initialValue={authSlice[action].code}
              onChange={value => {
                dispatch(
                  forgetSetting({
                    ...authSlice[action],
                    code: value
                  })
                );
              }}
              onComplete={values => {
                console.log(values);
                dispatch(
                  forgetSetting({
                    ...authSlice[action],
                    code: values
                  })
                );
                checkCodeToNext(values);
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: '20px'
            }}
          >
            <Box
              sx={{
                ...(authSlice[action].expire_date > 0 && {
                  opacity: 0.7,
                  cursor: 'menu',
                  color: theme.palette.dark
                }),
                color: theme.palette.primary.main,
                fontWeight: 500
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  mb: '0',
                  fontWeight: 500,
                  ...(moment(authSlice[action].expire_date).diff(
                    moment(),
                    'seconds'
                  ) <= 0 || authSlice[action].enable_edit_button
                    ? {
                        color: theme.palette.primary.main,
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                        opacity: 1
                      }
                    : {
                        opacity: 0.7,
                        cursor: 'default',
                        color: theme.palette.dark,
                        pointerEvents: 'none'
                      })
                }}
                onClick={resendCode}
              >
                <FaWhatsapp className='me-2' /> Resend WhatsApp
              </Typography>
            </Box>

            <Countdown />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: 'fixed',
          bottom: 40,
          cursor: 'pointer'
        }}
      >
        <Typography variant='h6' align='center'>
          Dont&apos;t have an account? <strong>Register</strong>
        </Typography>
      </Box>
    </Box>
  );
}
