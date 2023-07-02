'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import ContactChatWidgetStyle from '@/styles/ContactChatWidget.module.scss';
import MessageInput from './message.input';
import { ICustomTheme } from '@/types/index';

export default function MessageList() {
  const theme: ICustomTheme = useTheme();

  const screenWidth = useMediaQuery(theme.breakpoints.down('sm'));
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [receivedMessages] = useState<string[]>([
    'Hey Mohair',
    'How are you doing!',
    'Is there anything else you can'
  ]);
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = (message: string) => {
    setSentMessages([...sentMessages, message]);
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [sentMessages, receivedMessages]);

  return (
    <>
      <Box
        className={`${ContactChatWidgetStyle['message-list-container']}`}
        ref={messageListRef}
        sx={{
          ...(screenWidth && {
            height: '100vh !important',
            borderRadius: '0px !important',
            boxShadow: 'none !important'
          })
        }}
      >
        <Box
         sx={{
          ...(screenWidth && {
            marginTop: '90px'
          })
        }}
         
        >
          {receivedMessages.map((message, index) => (
            <Typography
              variant='h6'
              align='left'
              key={index}
              className={`${ContactChatWidgetStyle['fade-in']}`}
              sx={{
                width: 'fit-content',
                margin: '10px 20px',
                background: theme.palette.white,
                borderRadius: '4px',
                padding: '8px 15px'
              }}
            >
              {message}
            </Typography>
          ))}
          {sentMessages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Typography
                variant='h6'
                align='right'
                className={`${ContactChatWidgetStyle['fade-in']}`}
                sx={{
                  width: 'fit-content',
                  margin: '10px 10px 0px 10px',
                  background: theme.palette.white,
                  borderRadius: '4px',
                  padding: '8px 15px'
                }}
              >
                {message}
              </Typography>
            </Box>
          ))}
        </Box>
        <MessageInput onSendMessage={handleNewMessage} />
      </Box>
    </>
  );
}
