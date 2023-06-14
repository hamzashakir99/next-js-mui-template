import { createSlice } from '@reduxjs/toolkit';
import { IDepartmentSlice } from '../types/index';


const initialState: IDepartmentSlice = {
    data: {
        list: [],
        page: 0,
        limit: 20,
        has_more: true,
        search_text: ""
    },
    add: {
        name: ""
    },
    edit: {
        name: "ww"
    }
}

export const departmentSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        sheetAppSetting: (state: any) => {
            state.sheet.appSetting = !state.sheet.appSetting
        },
        drawerDepartmentSetting: (state: any, action: any) => {
            state.drawer[action.payload.deleteDepartmentDrawer] = !state.drawer[action.payload.deleteDepartmentDrawer]
        },
    },
})

// Action creators are generated for each case reducer function
export const { sheetAppSetting } = departmentSlice.actions

export default departmentSlice.reducer