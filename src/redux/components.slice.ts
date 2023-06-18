import { createSlice } from '@reduxjs/toolkit';
import { IComponentsSlice } from '../types/index';


const initialState: IComponentsSlice = {
    sheet: {
        appSetting: false,
    },
    drawer: {
        deleteDepartmentDrawer: false,
    }
}

export const componentsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        sheetAppSetting: (state) => {
            state.sheet.appSetting = !state.sheet.appSetting
        },
        drawerDepartmentSetting: (state: any, action: any) => {
            state.drawer[action.payload.deleteDepartmentDrawer] = !state.drawer[action.payload.deleteDepartmentDrawer]
        },
    },
})

// Action creators are generated for each case reducer function
export const { sheetAppSetting } = componentsSlice.actions

export default componentsSlice.reducer