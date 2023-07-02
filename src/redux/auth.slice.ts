import { createSlice } from '@reduxjs/toolkit';
import { IAuthSlice } from '../types/index';

const initialState: IAuthSlice = {
  action: 'login',
  role:'agent',
  login: {
    phone: '',
    password: '',
    step: 0,
    show_password: false,
    loading: false,
    domain: '',
    user_name:''
  },
  register: {
    phone: '',
    name: '',
    password: '',
    step: 0,
    show_password: false,
    enable_password_button: false,
    enable_edit_button: false,
    code: '',
    loading: false,
    expire_date: '',
    country_code: ''
  },
  forgot_password: {
    phone: '',
    step: 0,
    code: '',
    password: '',
    show_password: false,
    expire_date: '',
    loading: false,
    country_code: '',
    remaining_time: '',
    enable_edit_button: false
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAction: (state: any, action: any) => {
      state.action = action.payload;
    },
    loginSetting: (state: any, action: any) => {
      state.login = action.payload;
    },
    registerSetting: (state: any, action: any) => {
      state.register = action.payload;
    },
    forgetSetting: (state: any, action: any) => {
      state.forgot_password = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { loginSetting, forgetSetting, registerSetting, changeAction } =
  authSlice.actions;

export default authSlice.reducer;
