import React from "react";

import { IAccordion } from "@/types/index";
import AppSettingSheet from "./app.setting.accordion";


export default function CustomAccordion({
    action
}: IAccordion) {
    if(action == 'app-setting') {
        return <AppSettingSheet />
    }
    return null;
}
