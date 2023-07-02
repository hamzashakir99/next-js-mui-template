'use client';

import React from 'react';
import { Box } from '@mui/material';
import ChatBox from './chat.box';
import ContactChatWidgetStyle from '@/styles/ContactChatWidget.module.scss';
import ContactHeader from './header';
import ContactChatIcon from './contact.chat.icon';
import { useSelector } from 'react-redux';
export default function ContactChatWidget() {
  const contactWidgetSlice = useSelector(
    (state: any) => state.contactWidgetSlice
  );
  return (
    <>
      <ContactHeader />
      <ContactChatIcon />
      {contactWidgetSlice.contact_widget.is_show && (
        <Box className={`${ContactChatWidgetStyle['contact-chat-section']}   `}>
          <ChatBox />
        </Box>
      )}
    </>
  );
}
