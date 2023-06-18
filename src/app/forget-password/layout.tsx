"use client";
import React from "react";
import { Box } from "@mui/material"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import { useSelector, useDispatch } from "react-redux"
import { loginSetting } from "@/src/redux/auth.slice"
export default function AdminLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch()
    const loginSelector = useSelector((state: any) => state.loginSlice)
    return (
        <Box>
            {loginSelector.step > 0 && <MdOutlineKeyboardArrowLeft
                className="back-btn"
                onClick={() => dispatch(loginSetting({
                    ...loginSelector,
                    step: loginSelector.step - 1
                }))}
            />}
            {children}
        </Box>
    )
}