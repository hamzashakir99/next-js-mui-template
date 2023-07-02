import { createSlice } from '@reduxjs/toolkit';
import { IContactWidgetSlice } from '../types/index';

const initialState: IContactWidgetSlice = {
  contact_widget: {
    is_show: false,
  }
};

export const contactWidgetSlice = createSlice({
  name: 'contact widget',
  initialState,
  reducers: {
    contactWidgetSetting: (state: any, action: any) => {
      state.contact_widget = action.payload;
    }

  }
});

// Action creators are generated for each case reducer function
export const { contactWidgetSetting } = contactWidgetSlice.actions;

export default contactWidgetSlice.reducer;
