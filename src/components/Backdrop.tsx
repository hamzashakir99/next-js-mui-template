'use client';
import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';
export default function BackdropLoader() {
  const backdrop = useSelector(
    (state: any) => state.componentsSlice.backdrop.value
  );
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}
