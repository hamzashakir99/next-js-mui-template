"use client"

import React from "react";
import { Container } from "@mui/material";

import NavigationHeader from "@/src/components/auth/navigation.header";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        pt: "40px",
        pb: "40px",
      }}
    >
      <NavigationHeader/>
      {children}
    </Container>
  );
}
