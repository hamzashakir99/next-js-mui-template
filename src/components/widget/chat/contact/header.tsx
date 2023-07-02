'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { FaRegBell } from 'react-icons/fa';
import { HiMenuAlt2, HiOutlineSearch } from 'react-icons/hi';

import ContactChatWidgetStyle from '@/styles/ContactChatWidget.module.scss';
import { ICustomTheme } from '@/types/index';
export default function ContactHeader() {
  const theme: ICustomTheme = useTheme();
  return (
    <>
      <Box
        className={`${ContactChatWidgetStyle['contact-header-container']}   `}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <HiMenuAlt2
            style={{
              color: theme.palette.primary.main,
              fontSize: '20px'
            }}
          />
          <Typography
            variant='h5'
            align='center'
            style={{ textTransform: 'capitalize' }}
          >
            <strong>Customer</strong>
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <HiOutlineSearch
            style={{
              color: theme.palette.primary.main,
              fontSize: '20px'
            }}
          />
          <Box
            sx={{
              display: 'flex'
            }}
            className='d-flex'
          >
            <FaRegBell
              style={{
                color: theme.palette.primary.main,
                fontSize: '20px'
              }}
            />
          </Box>
          <Image
            style={{
              borderRadius: '50%'
            }}
            src='/images/profile.jpg'
            alt='Profile Image'
            width='40'
            height='40'
          />
        </Box>
      </Box>
    </>
  );
}
