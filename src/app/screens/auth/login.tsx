'use client'

import React from 'react'
import { Metadata } from 'next'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  IconButton,
  Container
} from '@mui/material'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton'
import { HiOutlineKey } from 'react-icons/hi'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

import { loginSetting } from '@/src/redux/auth.slice'

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginScreen() {
  const dispatch = useDispatch()
  const authSlice = useSelector((state: any) => state.authSlice)
  const { action } = authSlice
  const handleNext = () => {
    dispatch(
      loginSetting({
        ...authSlice[action].login,
        step: authSlice[action].step + 1
      })
    )
  }
  const handleClickShowPassword = () => {
    dispatch(
      loginSetting({
        ...authSlice[action].login,
        show_password: !authSlice[action].show_password
      })
    )
  }
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'
  const onSubmit = async () => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        phone: authSlice[action].phone,
        password: authSlice[action].password,
        callbackUrl
      })
      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        const jsonResponse: {
          status: number
          errors: string
        } = JSON.parse(res?.error)
        if (jsonResponse.status == 201) {
          router.push('/phone-verify')
        } else {
          // setFormValues((prev: any)=>({ ...prev, "error": jsonResponse.errors }))
          // show alert
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  return (
    <Container>
      <Box>
        {authSlice[action].step === 1 ? (
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
                      type={
                        authSlice[action].show_password ? 'text' : 'password'
                      }
                      label='Password'
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
                    loading={false}
                    loadingPosition='end'
                    endIcon={<MdOutlineKeyboardArrowRight />}
                    variant='outlined'
                    className='icon-right'
                    onClick={() => onSubmit()}
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
                <strong>
                  <Link href='/forget-password'>Forget Password?</Link>
                </strong>
              </Typography>
            </Box>
          </>
        ) : (
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
                Dont&apos;t have an account? <strong>Register</strong>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  )
}
