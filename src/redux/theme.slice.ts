import { createSlice } from '@reduxjs/toolkit';
import { IThemeSlice } from '../types/index';


const initialState: IThemeSlice = {
    mode: "light",
}

export const themeSlice = createSlice({
    name: 'theme-slice',
    initialState,
    reducers: {
        changeThemeMode: (state) => {
            state.mode = state.mode == 'light' ? 'dark': 'light';
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeThemeMode } = themeSlice.actions

export default themeSlice.reducer