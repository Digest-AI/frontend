"use client";

import {
  createTheme,
  PaletteOptions as MUIPaletteOptions,
  Palette as MUIPalette,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: MUIPalette["primary"];
  }

  interface PaletteOptions {
    tertiary?: MUIPaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    tertiary: true;
  }
}

const theme = createTheme({
  defaultColorScheme: "dark",
  cssVariables: {
    colorSchemeSelector: "[data-theme='%s']",
  },
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: "#0b0a12",
          paper: "#14131f",
        },
        primary: {
          light: "#c4b5fd",
          main: "#8b5cf6",
          dark: "#6d28d9",
          contrastText: "#fafafa",
        },
        secondary: {
          light: "#fdba74",
          main: "#fb923c",
          dark: "#ea580c",
          contrastText: "#0b0a12",
        },
        tertiary: {
          light: "#5eead4",
          main: "#2dd4bf",
          dark: "#14b8a6",
          contrastText: "#0b0a12",
        },
        text: {
          primary: "rgba(250, 250, 250, 0.94)",
          secondary: "rgba(250, 250, 250, 0.62)",
          disabled: "rgba(250, 250, 250, 0.38)",
        },
      },
    },
    light: {
      palette: {
        background: {
          default: "#f8f7fc",
          paper: "#ffffff",
        },
        primary: {
          light: "#7c3aed",
          main: "#5b21b6",
          dark: "#4c1d95",
          contrastText: "#fafafa",
        },
        secondary: {
          light: "#ea580c",
          main: "#c2410c",
          dark: "#9a3412",
          contrastText: "#fafafa",
        },
        tertiary: {
          light: "#0d9488",
          main: "#0f766e",
          dark: "#115e59",
          contrastText: "#fafafa",
        },
        text: {
          primary: "rgba(15, 12, 30, 0.92)",
          secondary: "rgba(15, 12, 30, 0.62)",
          disabled: "rgba(15, 12, 30, 0.4)",
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto), system-ui, sans-serif",
    button: {
      textTransform: "none",
    },
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 500,
    },
  },
});

export default theme;
