"use client";
import React, { useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineKey, HiOutlineOfficeBuilding } from "react-icons/hi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordStrengthBar from "react-password-strength-bar";
import PasswordChecklist from "react-password-checklist";
import { useSelector, useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import PinInput from "react-pin-input";
import { BsEnvelope } from "react-icons/bs";

import { ICustomTheme } from '@/types/index';
import { forgetSetting } from "@/src/redux/auth.slice";
import styles from "@/styles/Login.module.scss";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const authSlice = useSelector((state: any) => state.authSlice);
  const { action } = authSlice;
  const theme: ICustomTheme = useTheme();
  const handleClickShowPassword = () => {
    dispatch(
      forgetSetting({
        ...authSlice[action],
        show_password: !authSlice[action].show_password,
      })
    );
  };
  const Countdown = useCallback(() => {
    return (
      <Box className={`${styles["resend-countdown"]}`}>
        <svg
          style={{
            width: "0",
            height: "0",
          }}
        >
          <defs>
            <linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
              <stop offset="5%" stopColor={theme.palette.greenish} />
              <stop offset="95%" stopColor={theme.palette.blue} />
            </linearGradient>
          </defs>
        </svg>
        <CountdownCircleTimer
          isPlaying
          duration={60}
          colors="url(#your-unique-id)"
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </Box>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0]);
  return (
    <Container>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        {authSlice[action].step === 1 ? (
          <>
            <Container
              sx={{
                "@media (width < 600px)": {
                  padding: "40px 6px",
                },
                padding: "40px 24px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{
                  marginTop: "50px",
                }}
              >
                <Grid item md={7} xs={12}>
                  <Typography variant="h2" align="center">
                    Forget Password
                  </Typography>
                  <Typography variant="body1" align="center">
                    Please enter your password for logging
                    <br />
                    into your account
                  </Typography>
                  <Box
                    sx={{
                      margin: "30px 0",
                    }}
                  >
                    <TextField
                      type={authSlice[action].show_password ? "text" : "password"}
                      label="Password"
                      value={authSlice[action].password}
                      onChange={(event) => {
                        dispatch(
                          forgetSetting({
                            ...authSlice[action],
                            password: event.target.value,
                          })
                        );
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HiOutlineKey />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {authSlice[action].show_password ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {authSlice[action].password && (
                      <>
                        <PasswordStrengthBar
                          style={{ margin: "20px 0 0" }}
                          className={` ${styles["password-validator"]}`}
                          password={authSlice[action].password}
                        />
                        <PasswordChecklist
                          rules={[
                            "minLength",
                            "specialChar",
                            "number",
                            "capital",
                          ]}
                          minLength={8}
                          value={authSlice[action].password}
                          className={` ${styles["password-validator"]}`}
                        />
                      </>
                    )}
                  </Box>
                  <Button>
                    <HiOutlineOfficeBuilding />
                    <span>Confirm</span>
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </>
        ) : (
          <Container
            sx={{
              "@media (width < 600px)": {
                padding: "40px 6px",
              },
              padding: "40px 24px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{
                marginTop: "50px",
              }}
            >
              <Grid item md={6} xs={12}>
                <Typography variant="h2" align="center">
                  Verification
                </Typography>
                <Typography variant="body1" align="center">
                  Help us to verify your login
                </Typography>
                <Box
                  sx={{
                    margin: "30px 0",
                  }}
                >
                  <TextField
                    type="number"
                    label="WhatsApp Number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaWhatsapp />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Typography variant="body1" align="center">
                  We have sent a verification code successfully to the
                  registered WhatsApp number, please enter the code below:
                </Typography>
                <Box
                  className="number-input"
                  sx={{
                    mt: "20px",
                  }}
                >
                  <PinInput
                    length={4}
                    initialValue={authSlice[action].code}
                    onChange={(value) => {
                      dispatch(
                        forgetSetting({
                          ...authSlice[action],
                          code: value,
                        })
                      );
                    }}
                    onComplete={() => {
                      dispatch(
                        forgetSetting({
                          ...authSlice[action],
                          step: authSlice[action].step + 1,
                        })
                      );
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        mt: "1.5rem",
                        mb: "0",
                      }}
                    >
                      <FaWhatsapp className="me-2" /> Resend WhatsApp
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        mb: "1.5rem",
                      }}
                    >
                      <BsEnvelope className="me-2" /> Send via Email
                    </Typography>
                  </Box>

                  <Countdown />
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                position: "fixed",
                bottom: 40,
              }}
            >
              <Typography variant="h6" align="center">
                Dont&apos;t have an account? <strong>Register</strong>
              </Typography>
            </Box>
          </Container>
        )}
      </Box>
    </Container>
  );
}
