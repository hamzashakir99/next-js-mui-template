'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { commonUpdate } from '@/src/redux/common.slice';
import { commonAPIs } from '@/src/services/common';

export default function CommonComponent() {
  const dispatch = useDispatch();
  const commonSlice = useSelector((state: any) => state.commonSlice);
  useEffect(() => {
    if (commonSlice.domain.configured) {
      const res = commonAPIs(commonSlice.domain.name);
      const getCommonData = async () => {
        try {
          const promiseArr = [];
          if (!commonSlice.phone.is_loaded) {
            promiseArr.push(res.getPhoneCode());
          }
          if (!commonSlice.language.is_loaded) {
            promiseArr.push(res.getLanguages());
          }
          if (!commonSlice.countries.is_loaded) {
            promiseArr.push(res.getCountries());
          }
          if (!commonSlice.cities.is_loaded) {
            promiseArr.push(res.getCities());
          }
          if (promiseArr.length) {
            const responseArr = await Promise.all(promiseArr);
            const payload: any = {}
            for (const response of responseArr) {
              if (response.status === 200 && response.data.is_success) {
                if (response.action === 'phone') {
                  payload.phone = {
                    ...commonSlice.phone,
                    is_loaded: true,
                    data: response.data.data,
                    full_data: response.data.data
                  }
                }
                else if (response.action === 'language') {
                  payload.language = {
                    ...commonSlice.language,
                    is_loaded: true,
                    data: response.data.data,
                    full_data: response.data.data
                  }
                }
                else if (response.action === 'countries') {
                  payload.countries = {
                    ...commonSlice.countries,
                    is_loaded: true,
                    data: response.data.data,
                    full_data: response.data.data
                  }
                }
                else if (response.action === 'cities') {
                  payload.cities = {
                    ...commonSlice.cities,
                    is_loaded: true,
                    data: response.data.data,
                    full_data: response.data.data
                  }
                }
              }
            }
            dispatch(
              commonUpdate(payload)
            );
          }
        } catch (error: any) {
          console.log(error);
        }
      };
      getCommonData();
    }
  }, [
    commonSlice.domain.configured,
    commonSlice.domain.name,
    commonSlice.language.is_loaded,
    commonSlice.phone,
    dispatch
  ]);

  return null;
}
