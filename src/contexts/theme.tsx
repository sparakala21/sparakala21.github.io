"use client";

import type { JSX, PropsWithChildren } from "react";
import type { CssVarsThemeOptions } from "@mui/joy/styles";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import "@fontsource/roboto-slab";
import { CssBaseline } from "@mui/joy";

declare module '@mui/joy/styles' {
  interface Palette {
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }
  
  interface TypographySystem {
    customHeading: React.CSSProperties;
    brandTitle: React.CSSProperties;
    subtitle: React.CSSProperties;
    accent: React.CSSProperties;
    "body-lg": React.CSSProperties;
    "body-md": React.CSSProperties;
  }
}

const remoThemeConfig: CssVarsThemeOptions = {
  components: {
    JoyListItemButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "success" && {
            "&.Mui-selected": {
              background: "#36151e",
            },
          }),
        }),
      },
    },
  },

  colorSchemes: {
    light: {
      palette: {
        background: {
          backdrop: "#36151eAA",
        },
        // steel blue
        primary: {
          "50": "#e8f2fb",
          "100": "#c5def4",
          "200": "#9fcaed",
          "300": "#79b6e5",
          "400": "#5ca7df",
          "500": "#3f88c5", // main steel blue
          "600": "#397cb5",
          "700": "#316da0",
          "800": "#295f8c",
          "900": "#1b4969",
          solidColor: "var(--joy-palette-primary-900, #1b4969)",
          solidBg: "var(--joy-palette-primary-500, #3f88c5)",
          solidHoverBg: "var(--joy-palette-primary-600, #397cb5)",
          solidActiveBg: "var(--joy-palette-primary-700, #316da0)",
          solidDisabledColor: "var(--joy-palette-neutral-400, #9FA6AD)",
          solidDisabledBg: "var(--joy-palette-primary-100, #c5def4)",
        },
        // apple green
        secondary: {
          "50": "#f0f8e6",
          "100": "#d9edbf",
          "200": "#c0e195",
          "300": "#a6d56b",
          "400": "#94cc4b",
          "500": "#72b01d", // main apple green
          "600": "#68a21a",
          "700": "#5c9016",
          "800": "#507e13",
          "900": "#3e620c",
        },
        // magnolia (light neutral)
        neutral: {
          "50": "#fefefe",
          "100": "#fdfdfd",
          "200": "#fbfbfb",
          "300": "#f9f9f9",
          "400": "#f6f6f6",
          "500": "#f3eff5", // main magnolia
          "600": "#e4dfe6",
          "700": "#c8c0ca",
          "800": "#aba0ad",
          "900": "#706570",
        },
        // dark purple
        success: {
          "50": "#f1eaec",
          "100": "#dccbd0",
          "200": "#c5aab2",
          "300": "#ad8994",
          "400": "#9a717e",
          "500": "#36151e", // main dark purple
          "600": "#32131c",
          "700": "#2d1119",
          "800": "#280e15",
          "900": "#1e090e",
        },
        danger: {
          "50": "#fdeaea",
          "100": "#facaca",
          "200": "#f6a6a6",
          "300": "#f28282",
          "400": "#ef6666",
          "500": "#d00000", // main engineering orange
          "600": "#bc0000",
          "700": "#a40000",
          "800": "#8c0000",
          "900": "#660000",
        },
        warning: {
          "50": "#fff5f0",
          "100": "#ffe4d9",
          "200": "#ffd1bf",
          "300": "#ffbca3",
          "400": "#ffab8f",
          "500": "#ff9877",
          "600": "#f58a6b",
          "700": "#e6785a",
          "800": "#d6674a",
          "900": "#bc4a2e",
        },
      } as any,
      
    },
  },
  fontFamily: {
    display: "Roboto Slab, serif",
    body: "Roboto Slab, serif",
  },
  typography: {
    h1: {
      fontSize: "2.25rem",
      fontWeight: 700, 
      color: "var(--joy-palette-secondary-500)", // apple green
      fontFamily: "Roboto Slab, serif",
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 700,
      color: "var(--joy-palette-primary-600)", // steel blue
      fontFamily: "Roboto Slab, serif",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "var(--joy-palette-success-500)", // dark purple
      fontFamily: "Roboto Slab, serif",
      lineHeight: 1.4,
    },
    accent: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "var(--joy-palette-danger-500)", // engineering orange
      fontFamily: "Roboto Slab, serif",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    "body-lg": {
      fontSize: "1.125rem", 
      fontWeight: 400,
      color: "var(--joy-palette-success-600)", // darker dark purple
      fontFamily: "Roboto Slab, serif",
      lineHeight: 1.6,
    },
    "body-md": {
      fontSize: "1rem",
      fontWeight: 400,
      color: "var(--joy-palette-success-700)", // even darker purple
      fontFamily: "Roboto Slab, serif",
      lineHeight: 1.5,
    },
  },
};

const theme = extendTheme(remoThemeConfig);

export default function ThemeProvider(props: PropsWithChildren): JSX.Element {
  const { children } = props;
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}