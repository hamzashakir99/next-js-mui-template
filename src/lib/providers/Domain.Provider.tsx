'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { domainUpdate } from '@/redux/common.slice';

const Providers = () => {
  const dispatch = useDispatch();
  const commonSelector = useSelector((state: any) => state.commonSlice);

  useEffect(() => {
    if (!commonSelector.domain.configured && window) {
      const domain =
        window.location.hostname == 'localhost'
          ? commonSelector.domain.name
          : window.location.hostname;
      console.log(`current domain name is ${commonSelector.domain.name}`);
      dispatch(
        domainUpdate({
          name: domain,
          configured: true
        } as any)
      );
    }
  }, [dispatch, commonSelector.domain.configured, commonSelector.domain.name]);
  return null;
};

export default Providers;
