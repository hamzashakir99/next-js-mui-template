'use client';

import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import ContactChatWidgetStyle from '@/styles/ContactChatWidget.module.scss';
import { contactWidgetSetting } from '@/src/redux/contact.widget.slice';
import { ICustomTheme } from '@/types/index';

export default function MobileChatHeader() {
  const theme: ICustomTheme = useTheme();
  const dispatch = useDispatch();
  const screenWidth = useMediaQuery(theme.breakpoints.down('sm'));
  const contactWidgetSlice = useSelector(
    (state: any) => state.contactWidgetSlice
  );
  return (
    <>
      {contactWidgetSlice.contact_widget.is_show && screenWidth && (
        <Box className={`${ContactChatWidgetStyle['mobile-chat-header']}   `}>
          <Box>
            <FaTimes
              style={{
                color: theme.palette.white
              }}
              onClick={() => {
                dispatch(
                  contactWidgetSetting({
                    ...contactWidgetSlice.contact_widget,
                    is_show: !contactWidgetSlice.contact_widget.is_show
                  })
                );
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
