'use client';

import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';

import ContactChatWidgetStyle from '@/styles/ContactChatWidget.module.scss';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Box className={`${ContactChatWidgetStyle['message-input']}   `}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 6px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '10px'
            }}
          >
            <BsEmojiSmile />
            <GrAttachment />
          </Box>
          <Box
            className={`${ContactChatWidgetStyle['send-message-btn']}   `}
            onClick={handleSendMessage}
          >
            <AiOutlineSend />
          </Box>
        </Box>
        <form onSubmit={e => e.preventDefault()}>
          <TextField
            type='text'
            placeholder='Text Message'
            autoComplete='off'
            className={`${ContactChatWidgetStyle['message-input-container']}   `}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </form>
      </Box>
    </>
  );
}
