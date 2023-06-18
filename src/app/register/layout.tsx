"use client";
import React from "react";
import { Container } from "@mui/material";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { loginSetting } from "@/src/redux/auth.slice";
export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const loginSelector = useSelector((state: any) => state.loginSlice);
  return (
    <Container
      maxWidth="sm"
      sx={{
        pt: "40px",
        pb: "40px",
      }}
    >
      {loginSelector.login.step ? (
        <MdOutlineKeyboardArrowLeft
          className="back-btn"
          onClick={() =>
            dispatch(
              loginSetting({
                ...loginSelector,
                login: {
                  ...loginSelector.login,
                  step: loginSelector.login.step - 1,
                },
              })
            )
          }
        />
      ) : null}
      {children}
    </Container>
  );
}
