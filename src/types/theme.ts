import { Palette, Theme } from "@mui/material/styles";

export interface ICustomePalette extends Palette {
    greenish: string;
    blue: string;
    lightGray: string;
    dark: string;
    white:string;
}
export interface ICustomTheme extends Theme {
    palette: ICustomePalette;
}
