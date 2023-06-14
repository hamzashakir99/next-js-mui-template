import React, { useRef } from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import CustomAccordion from "@/components/accordion/index";

export default function AppSettingSheet() {
  const theme = useTheme();
  const focusRef: any = useRef<HTMLButtonElement>();
  const sheetRef: any = useRef<BottomSheetRef>();
  const componentsSlice = useSelector(
    (state: RootState) => state.componentsSlice
  );
  return (
    <>
      <BottomSheet
        open={componentsSlice.sheet.appSetting}
        skipInitialTransition
        ref={sheetRef}
        initialFocusRef={focusRef}
        defaultSnap={() => 10}
        snapPoints={({ maxHeight }) => [
          15,
          maxHeight / 4,
          maxHeight * 0.6,
        ]}
        expandOnContentDrag={false}
        style={
          {
            "--theme-background-paper": theme.palette.background.default,
            "--theme-divider": theme.palette.divider,
          } as React.CSSProperties
        }
      >
        <Container maxWidth="lg">
          <Box>
            <Typography align="center" sx={{ mb: 2 }}>
              App Setting
            </Typography>
            <CustomAccordion action="app-setting" />
          </Box>
        </Container>
      </BottomSheet>
    </>
  );
}
