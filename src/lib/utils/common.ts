import { changeThemeMode } from '@/redux/theme.slice';
export const changeTheme = (dispatch: any) => {
    dispatch(changeThemeMode())
}