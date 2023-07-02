'use client';

import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';

import ContactChatWidgetStyle from '@/styles/ContactChatWidget.module.scss';
import MessageList from './message.list';
import MobileChatHeader from './mobile.chat.header';

export default function ChatBox() {
  const theme = useTheme();
  const screenWidth = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Grid item md={12} xs={12}>
        <Box>

          <Box
            className={`${ContactChatWidgetStyle['messages-main-container']}   `}
            sx={{
              ...(screenWidth && {
                zIndex: '999',
                right: '0px !important',
                bottom: '0px !important',
                width: '100% !important'
              })
            }}
          >
          <MobileChatHeader />
            <MessageList />
            <Box
              className={`${ContactChatWidgetStyle['chatApp__convSendMessage']}   `}
            ></Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
