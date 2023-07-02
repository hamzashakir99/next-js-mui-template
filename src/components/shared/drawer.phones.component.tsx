'use client';
import React, { useState } from 'react';
import { Box, Typography, Drawer, CircularProgress } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { commonUpdate } from '@/src/redux/common.slice';
import { drawerSetting } from '@/src/redux/components.slice';
import registerStyles from '@/styles/Register.module.scss';

export default function DrawerPhones() {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const drawerSlice = useSelector((state: any) => state.componentsSlice);
  const commonSlice = useSelector((state: any) => state.commonSlice);
  const { data, search_text } = commonSlice.phone;

  const toggleDrawer = () => () => {
    dispatch(drawerSetting('phoneListDrawer' as any));
  };
  const list = (anchor: string) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250
      }}
      role='presentation'
    >
      <Box className={`${registerStyles['flag-list']}`}>
        <Box
          className={`${registerStyles['flag-list-search']}`}
          sx={{
            display: 'flex',
            gap: '10px'
          }}
        >
          <AiOutlineSearch />
          <input
            type='text'
            name='number'
            autoComplete='off'
            placeholder='Search here ...'
            value={commonSlice.phone.search_text}
            onChange={event => {
              let search = search_text;
              if (event.target.value.includes('+')) {
                search = event.target.value.replaceAll('+', '\\+');
              } else {
                search = new RegExp(event.target.value, 'i');
              }
              dispatch(
                commonUpdate({
                  phone: {
                    ...commonSlice.phone,
                    search_text: event.target.value,
                    data: commonSlice.phone.full_data.filter(function (
                      el: any
                    ) {
                      return (
                        new RegExp(search, 'i').test(el.name) ||
                        new RegExp(search, 'i').test(el.short_name) ||
                        new RegExp(search, 'i').test(el.phone_code)
                      );
                    })
                  }
                } as any)
              );
            }}
          />
          <FaRegTimesCircle
            onClick={() => {
              dispatch(
                commonUpdate({
                  phone: {
                    ...commonSlice.phone,
                    search_text: '',
                    data: commonSlice.phone.full_data
                  }
                } as any)
              );
            }}
          />
        </Box>
        <hr />
        <Box
          id='scrollableDivAgents'
          sx={{
            height: '60vh',
            overflow: 'auto'
          }}
        >
          <InfiniteScroll
            dataLength={data?.length} //This is important field to render the next data
            next={() => setHasMore(false)}
            hasMore={hasMore}
            scrollableTarget='scrollableDivAgents'
            loader={
              <Box sx={{ margin: '10px', textAlign: 'center' }}>
                {commonSlice.phone.search_text ? (
                  <Typography variant='h5' align='center'>
                    Nothing Found
                  </Typography>
                ) : (
                  <CircularProgress />
                )}
              </Box>
            }
          >
            {data.map((item: any) => {
              return (
                <Box
                  key={item._id}
                  className={`${registerStyles['listings']}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onClick={() => {
                    dispatch(
                      commonUpdate({
                        phone: {
                          ...commonSlice.phone,
                          current_flag: item.short_name,
                          current_code: item.phone_code,
                          search_text: '',
                          data: commonSlice.phone.full_data
                        }
                      } as any)
                    );
                    dispatch(drawerSetting('phoneListDrawer' as any));
                  }}
                >
                  <ReactCountryFlag countryCode={item.short_name} svg />

                  <Typography variant='h6' align='left'>
                    {item.name} <span>{item.phone_code}</span>
                  </Typography>
                </Box>
              );
            })}
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  );
  return (
    <>
      <Drawer
        anchor={'bottom'}
        open={drawerSlice.drawer.phoneListDrawer}
        onClose={toggleDrawer()}
      >
        {list('bottom')}
      </Drawer>
    </>
  );
}
