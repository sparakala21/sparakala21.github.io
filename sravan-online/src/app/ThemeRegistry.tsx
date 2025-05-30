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
      color: "#000000"
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#000000"
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#000000"
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disables ripple globally
        color: 'white',

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
    // Add explicit width constraints
    MuiContainer: {
      defaultProps: {
        maxWidth: false, // Options: 'xs', 'sm', 'md', 'lg', 'xl', or false for no limit
      },
      styleOverrides: {
        root: {
          width: '100%', // Explicit pixel width
          margin: '0 auto',   // Center the container
          paddingLeft: '8px',
          paddingRight: '16px',
        },
      },
    },
    // Make AppBar match the same width
    MuiAppBar: {
      styleOverrides: {
        root: {
          '& .MuiToolbar-root': {
            maxWidth: '1200px', // Match container width
            margin: '0 auto',
            width: '100%',
          },
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