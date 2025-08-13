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
              background: "#a351b1",
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
          backdrop: "#555555AA",
        },
        // teal
        primary: {
          "50": "#ddf3f1",
          "100": "#a9e1da",
          "200": "#6ccdc3",
          "300": "#08b9aa",
          "400": "#00a997",
          "500": "#009985",
          "600": "#008c77",
          "700": "#007c67",
          "800": "#006c58",
          "900": "#004f3b",
          solidColor: "var(--joy-palette-primary-900, #0B6BCB)",
          solidBg: "var(--joy-palette-primary-300, #0B6BCB)",
          solidHoverBg: "var(--joy-palette-primary-200, #185EA5)",
          solidActiveBg: "var(--joy-palette-primary-100, #12467B)",
          solidDisabledColor: "var(--joy-palette-neutral-400, #9FA6AD)",
          solidDisabledBg: "var(--joy-palette-primary-100, #E3EFFB)",
        },
        // light purple
        secondary: {
          "50": "#efe4f0",
          "100": "#d9bcda",
          "200": "#c090c2",
          "300": "#a767a9",
          "400": "#954a98",
          "500": "#833187",
          "600": "#782d81",
          "700": "#682779",
          "800": "#59226f",
          "900": "#411860",
        },
        // black
        neutral: {
          "50": "#f5f5f5",
          "100": "#e9e9e9",
          "200": "#d9d9d9",
          "300": "#c4c4c4",
          "400": "#9d9d9d",
          "500": "#7b7b7b",
          "600": "#555555",
          "700": "#434343",
          "800": "#262626",
          "900": "#000000",
        },
        // dark purple
        success: {
          "50": "#f2e6f3",
          "100": "#dec0e3",
          "200": "#c996d2",
          "300": "#b36ebf",
          "400": "#a351b1",
          "500": "#9338a4",
          "600": "#86349d",
          "700": "#752e94",
          "800": "#65298b",
          "900": "#49217a",
        },

        // dark orange
        danger: {
          "50": "#faeae7",
          "100": "#fecebd",
          "200": "#fdae93",
          "300": "#fd8f68",
          "400": "#fc7646",
          "500": "#fc6026",
          "600": "#f15a22",
          "700": "#e3531d",
          "800": "#d54c1a",
          "900": "#bc4013",
        },
        // light orange
        warning: {
          "50": "#fff3e1",
          "100": "#fee0b5",
          "200": "#fdcc85",
          "300": "#fdb756",
          "400": "#fca735",
          "500": "#fb9920",
          "600": "#f78d1e",
          "700": "#f07e1c",
          "800": "#ea6e1a",
          "900": "#e05617",
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
      color: "var(--joy-palette-secondary-600)",
      fontFamily: "Roboto Slab, serif",
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 700,
      color: "var(--joy-palette-primary-700)",
      fontFamily: "Roboto Slab, serif",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "var(--joy-palette-neutral-600)",
      fontFamily: "Roboto Slab, serif",
      lineHeight: 1.4,
    },
    accent: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "var(--joy-palette-success-500)",
      fontFamily: "Roboto Slab, serif",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    "body-lg": {
      fontSize: "1.125rem", 
      fontWeight: 400,
      color: "var(--joy-palette-success-800)",
      fontFamily: "Roboto Slab, serif",
      lineHeight: 1.6,
    },
    "body-md": {
      fontSize: "1rem",
      fontWeight: 400,
      color: "var(--joy-palette-success-600)",
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