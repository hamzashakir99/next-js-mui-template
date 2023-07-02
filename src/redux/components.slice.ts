import { createSlice } from '@reduxjs/toolkit';
import { IComponentsSlice } from '../types/index';

const initialState: IComponentsSlice = {
  drawer: {
    phoneListDrawer: false
  },
  alert: {
    display: false,
    message: '',
    type: 'error'
  },
  backdrop: {
    value: false
  }
};

export const componentsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    drawerSetting: (state: any, action: any) => {
      state.drawer[action.payload] = !state.drawer[action.payload];
    },
    alertState: (state: any, action: any) => {
      state.alert = action.payload
    },
    setBackdrop: (state: any, action: any) => {
      state.backdrop = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { drawerSetting, alertState, setBackdrop } = componentsSlice.actions;

export default componentsSlice.reducer;