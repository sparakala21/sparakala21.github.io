// ThemeRegistry.tsx
"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

// Create a single theme with all properties combined
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: "5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disables ripple globally
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.1s, background-color 0.1s',
          '&:active': {
            transform: 'translateY(2px)', // Small movement on click
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)', // Very subtle hover state
          },
          outline: '000000'
        },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}