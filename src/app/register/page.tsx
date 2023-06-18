'use client'
import React, { useCallback } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  IconButton,
  Button
} from '@mui/material'
import { MdOutlineKeyboardArrowRight, MdEdit } from 'react-icons/md'
import styles from '@/styles/Login.module.scss'
import PinInput from 'react-pin-input'
import { HiOutlineKey, HiOutlineOfficeBuilding } from 'react-icons/hi'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { FaWhatsapp } from 'react-icons/fa'
import PasswordStrengthBar from 'react-password-strength-bar'
import PasswordChecklist from 'react-password-checklist'
import LoadingButton from '@mui/lab/LoadingButton'
import { AiOutlineUser } from 'react-icons/ai'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { loginSetting } from '@/src/redux/auth.slice'
import Link from 'next/link'

export default function Login() {
  const dispatch = useDispatch()
  const authSlice = useSelector((state: any) => state.authSlice)
  const { action } = authSlice
  const handleNext = () => {
    dispatch(
      loginSetting({
        ...authSlice[action],
        step: authSlice[action].step + 1
      })
    )
  }
  const handleClickShowPassword = () => {
    dispatch(
      loginSetting({
        ...authSlice[action],
        show_password: !authSlice[action].show_password
      })
    )
  }
  const Countdown = useCallback(() => {
    return (
      <Box className={`${styles['resend-countdown']}`}>
        <svg style={{ width: '0', height: '0' }}>
          <defs>
            <linearGradient id='your-unique-id' x1='1' y1='0' x2='0' y2='0'>
              <stop offset='5%' stopColor='#5099BE' />
              <stop offset='95%' stopColor='#71C07B' />
            </linearGradient>
          </defs>
        </svg>
        <CountdownCircleTimer
          isPlaying={true}
          duration={60} // Replace with the desired duration in seconds
          colors='url(#your-unique-id)'
          // colorsTime={[60, 30, 15, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {() => {
            return 0 // remainingTime
          }}
        </CountdownCircleTimer>
      </Box>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0])
  return (
    <Container>
      <Box>
        {authSlice[action].step === 1 && (
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
                    Your Profile
                  </Typography>
                  <Typography variant='body1' align='center'>
                    We want to know who you are. <br />
                    Your name will not be shown publicly
                  </Typography>
                  <Box
                    sx={{
                      margin: '30px 0'
                    }}
                  >
                    <TextField
                      type='text'
                      label='Full Name'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AiOutlineUser />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                  <LoadingButton
                    loading={false}
                    loadingPosition='end'
                    endIcon={<MdOutlineKeyboardArrowRight />}
                    variant='outlined'
                    className='icon-right'
                    onClick={handleNext}
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
                transform: 'translate(-50%,0)'
              }}
            >
              <Typography variant='h6' align='center'>
                Already on WhatsPays?
                <strong>
                  <Link
                    href='/
                  login'
                  >
                    {` Login`}
                  </Link>
                </strong>
              </Typography>
            </Box>
          </>
        )}
        {authSlice[action].step === 2 && (
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
                    Your Profile
                  </Typography>
                  <Typography variant='body1' align='center'>
                    Choose a password for logging to your account
                  </Typography>
                  <Box
                    sx={{
                      margin: '30px 0'
                    }}
                  >
                    <TextField
                      type={
                        authSlice[action].show_password ? 'text' : 'password'
                      }
                      label='Password'
                      onChange={event => {
                        dispatch(
                          loginSetting({
                            ...authSlice[action],
                            password: event.target.value
                          })
                        )
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
                          minLength={8}
                          style={{ margin: '20px 0 0' }}
                          className='password-validator'
                          password={authSlice[action].password}
                        />
                        <PasswordChecklist
                          rules={[
                            'minLength',
                            'specialChar',
                            'number',
                            'capital',
                            'lowercase'
                          ]}
                          minLength={8}
                          value={authSlice[action].password}
                          className='password-validator'

                          // onChange={(params) => setEnableButton(params)}
                        />
                      </>
                    )}
                  </Box>
                  <Button variant='outlined' onClick={handleNext}>
                    <HiOutlineOfficeBuilding />
                    <span>Register</span>
                  </Button>
                </Grid>
              </Grid>
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 40,
                  left: '50%',
                  transform: 'translate(-50%,0)'
                }}
              >
                <Typography variant='h6' align='center'>
                  Already on WhatsPays? <strong>Login</strong>
                </Typography>
              </Box>
            </Box>
          </>
        )}
        {authSlice[action].step === 3 && (
          <Container
            sx={{
              '@media (width < 600px)': {
                padding: '40px 6px'
              },
              padding: '40px 24px',
              height: '100%',
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
                marginTop: '50px'
              }}
            >
              <Grid item md={6} xs={12}>
                <Typography variant='h2' align='center'>
                  Verification
                </Typography>
                <Typography variant='body1' align='center'>
                  Help us to verify your login
                </Typography>
                <Box
                  sx={{
                    margin: '30px 0'
                  }}
                >
                  <TextField
                    type='number'
                    label='WhatsApp Number'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <FaWhatsapp />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <MdEdit />
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Typography variant='body1' align='center'>
                  We have sent a verification code successfully to the
                  registered WhatsApp number, please enter the code below:
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
                        loginSetting({
                          ...authSlice[action],
                          code: value
                        })
                      )
                    }}
                    onComplete={() => {
                      dispatch(
                        loginSetting({
                          ...authSlice[action],
                          step: authSlice[action].step + 1
                        })
                      )
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography
                      variant='h6'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        mt: '1.5rem',
                        mb: '0'
                      }}
                    >
                      <FaWhatsapp className='me-2' /> Resend Code
                    </Typography>
                  </Box>

                  <Countdown />
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                position: 'fixed',
                bottom: 40
              }}
            >
              <Typography variant='h6' align='center'>
                Dont&apos;t have an account? <strong>Login</strong>
              </Typography>
            </Box>
          </Container>
        )}
        {authSlice[action].step === 0 && (
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
                    Get Started Free
                  </Typography>
                  <Typography variant='body1' align='center'>
                    Its time to enjoy ultimate experience
                  </Typography>
                  <Box
                    sx={{
                      margin: '30px 0'
                    }}
                  >
                    <TextField
                      type='number'
                      label='WhatsApp Number'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <FaWhatsapp />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                  <LoadingButton
                    loading={false}
                    loadingPosition='end'
                    endIcon={<MdOutlineKeyboardArrowRight />}
                    variant='outlined'
                    className='icon-right'
                    onClick={handleNext}
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
                  transform: 'translate(-50%,0)'
                }}
              >
                <Typography variant='h6' align='center'>
                  Already on WhatsPays? <strong>Login</strong>
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Container>
  )
}
