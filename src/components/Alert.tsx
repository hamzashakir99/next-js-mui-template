'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fade, Typography } from '@mui/material';
import AlertComponent from '@mui/material/Alert';
import { FaTimes, FaTimesCircle } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';

import { alertState } from '@/redux/components.slice';
import styles from '@/styles/Alert.module.scss';
export default function Alert() {
  const dispatch = useDispatch();
  const AlertSelector = useSelector((state: any) => state.componentsSlice);
  useEffect(() => {
    if (AlertSelector.alert.display) {
      setTimeout(() => {
        dispatch(
          alertState({
            ...AlertSelector.alert,
            display: false
          })
        );
      }, 3000);
    }
  }, [AlertSelector.alert, AlertSelector.alert.display, dispatch]);
  return (
    <>
      <Fade in={AlertSelector?.alert?.display}>
        <AlertComponent
          iconMapping={{
            error: (
              <FaTimesCircle fontSize='inherit' style={{ color: '#fff' }} />
            ),
            success: (
              <AiFillCheckCircle fontSize='inherit' style={{ color: '#fff' }} />
            )
          }}
          className={`mui-alert ${
            styles[`${AlertSelector?.alert?.type}-alert`]
          }`}
          action={
            <FaTimes
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => {
                dispatch(
                  alertState({
                    ...AlertSelector.alert,
                    display: false
                  })
                );
              }}
            />
          }
          variant='filled'
          severity={AlertSelector?.alert?.type}
          sx={{ mb: 2 }}
        >
          <Typography variant='h5'>{AlertSelector?.alert?.type}</Typography>
          <Typography
            variant='body1'
            style={{
              wordBreak: 'break-all',
              margin: '0'
            }}
          >
            {AlertSelector?.alert?.message}
          </Typography>
        </AlertComponent>
      </Fade>
    </>
  );
}
