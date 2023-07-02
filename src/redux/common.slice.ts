import { createSlice } from '@reduxjs/toolkit';
import { ICommonSlice } from '../types/index';

const initialState: ICommonSlice = {
  phone: {
    data: [],
    full_data: [],
    is_loaded: false,
    search_text: '',
    current_code: '+92',
    current_flag: 'PK'
  },
  language: {
    data: [],
    full_data: [],
    is_loaded: false,
    search_text: '',
    current_code: '+92',
    current_flag: 'PK'
  },
  countries: {
    data: [],
    full_data: [],
    is_loaded: false,
    search_text: '',
    current_code: '+92',
    current_flag: 'PK'
  },
  cities: {
    data: [],
    full_data: [],
    is_loaded: false,
    search_text: '',
    current_code: '+92',
    current_flag: 'PK'
  },
  domain: {
    configured: false,
    name: `test.${process.env.NEXT_PUBLIC_CLIENT_URL}`
  }
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    commonUpdate: (state: any, action: any) => {
      if(action.payload.phone){
        state.phone = action.payload.phone;
      }
      if(action.payload.language){
        state.language = action.payload.language;
      }
      if(action.payload.countries){
        state.countries = action.payload.countries;
      }
      if(action.payload.cities){
        state.cities = action.payload.cities;
      }
    },
    restorePhoneUpdate: (state: any) => {
      state.phone.full_data = state.phone.data;
    },
    domainUpdate: (state: any, action: any) => {
      state.domain.name = action.payload.name;
      state.domain.configured = action.payload.configured;
    },
  }
});

// Action creators are generated for each case reducer function
export const { commonUpdate, restorePhoneUpdate, domainUpdate } = commonSlice.actions;

export default commonSlice.reducer;
