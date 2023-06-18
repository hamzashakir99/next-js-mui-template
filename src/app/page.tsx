'use client'
import React from 'react'
import { Box, Grid, Button, Container } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { changeTheme } from '@/lib/index';

export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => router.push('/profile')}
              >
                Client Protect Page
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => router.push('/server-profile')}
              >
                Server Protect Page
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => changeTheme(dispatch)}
              >
                Change Theme
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
