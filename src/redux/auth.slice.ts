import { createSlice } from "@reduxjs/toolkit";
import { IAuthSlice } from "../types/index";

const initialState: IAuthSlice = {
  action: 'login',
  login: {
    phone: "",
    password: "Junaid123",
    step: 0,
    show_password: false,
  },
  register: {
    phone: "",
    name: "",
    password: "",
    step: 0,
    show_password: false,
    enable_password_button: false,
    code :""
  },
  forget_password: {
    step: 0,
    code: "",
    password: "",
    show_password: false,
  }
};

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSetting: (state: any, action: any) => {
      state.login = action.payload
    },
    registerSetting: (state: any, action: any) => {
      state.register = action.payload
    },
    forgetSetting: (state: any, action: any) => {
      state.forget_password = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSetting, forgetSetting, registerSetting } = authSlice.actions;

export default authSlice.reducer;
