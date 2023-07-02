'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { BiMessageDetail } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';

import { contactWidgetSetting } from '@/src/redux/contact.widget.slice';
import ContactChatWidgetStyle from '@/styles/ContactChatWidget.module.scss';
import { ICustomTheme } from '@/types/index';

export default function ContactChatIcon() {
  const theme: ICustomTheme = useTheme();
  const dispatch = useDispatch();
  const contactWidgetSlice = useSelector(
    (state: any) => state.contactWidgetSlice
  );
  return (
    <>
      <Box
        className={`${ContactChatWidgetStyle['contact-chat-icon']}   `}
        onClick={() => {
          dispatch(
            contactWidgetSetting({
              ...contactWidgetSlice.contact_widget,
              is_show: !contactWidgetSlice.contact_widget.is_show
            })
          );
        }}
      >
        <BiMessageDetail
          style={{
            color: theme.palette.primary.main,
            fontSize: '26px'
          }}
        />
      </Box>
    </>
  );
}
