"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import { loginSetting } from "@/src/redux/auth.slice";

export default function NavigationHeader() {
  const dispatch = useDispatch();
  const authSlice = useSelector((state: any) => state.authSlice);
  const { action } = authSlice;
  return (
    <>
      {authSlice[action].step ? (
        <MdOutlineKeyboardArrowLeft
          className="back-btn"
          onClick={() =>
            dispatch(
              loginSetting({
                ...authSlice[action].login,
                step: authSlice[action].step - 1,
              })
            )
          }
        />
      ) : null}
    </>
  );
}
