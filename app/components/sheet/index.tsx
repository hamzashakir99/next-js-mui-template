import React from "react";

import { ISheet } from "@/types/index";
import AppSettingSheet from "./app.setting.sheet";


export default function Sheet({
    action
}: ISheet) {
    if(action == 'app-setting') {
        return <AppSettingSheet />
    }
    return null;
}
