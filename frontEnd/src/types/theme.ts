import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

// Define the type for typography text transform
type TypographyTextTransform = NonNullable<
  Theme["typography"]["button"]
>["textTransform"];

// Common theme settings for both light and dark modes
const commonThemeSettings = {
  MuiCssBaseline: {
    styleOverrides: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    [aria-hidden="true"] input,
    [aria-hidden="true"] button,
    [aria-hidden="true"] select,
    [aria-hidden="true"] textarea {
     pointer-events: none !important;
     outline: none !important;
    }
    [aria-hidden="true"] .MuiInputBase-input {
      pointer-events: none !important;
  }
    `,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "0em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "0em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: "0.00714em",
    },
    body1: {
      letterSpacing: "0.00938em",
    },
    body2: {
      letterSpacing: "0.01071em",
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.02857em",
      textTransform: "none" as TypographyTextTransform,
    },
    caption: {
      letterSpacing: "0.03333em",
    },
    overline: {
      letterSpacing: "0.08333em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.06),0px 1px 1px 0px rgba(0,0,0,0.04),0px 1px 3px 0px rgba(0,0,0,0.08)",
    "0px 3px 1px -2px rgba(0,0,0,0.06),0px 2px 2px 0px rgba(0,0,0,0.04),0px 1px 5px 0px rgba(0,0,0,0.08)",
    "0px 3px 3px -2px rgba(0,0,0,0.06),0px 3px 4px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.08)",
    "0px 2px 4px -1px rgba(0,0,0,0.06),0px 4px 5px 0px rgba(0,0,0,0.04),0px 1px 10px 0px rgba(0,0,0,0.08)",
    "0px 3px 5px -1px rgba(0,0,0,0.06),0px 5px 8px 0px rgba(0,0,0,0.04),0px 1px 14px 0px rgba(0,0,0,0.08)",
    "0px 3px 5px -1px rgba(0,0,0,0.06),0px 6px 10px 0px rgba(0,0,0,0.04),0px 1px 18px 0px rgba(0,0,0,0.08)",
    "0px 4px 5px -2px rgba(0,0,0,0.06),0px 7px 10px 1px rgba(0,0,0,0.04),0px 2px 16px 1px rgba(0,0,0,0.08)",
    "0px 5px 5px -3px rgba(0,0,0,0.06),0px 8px 10px 1px rgba(0,0,0,0.04),0px 3px 14px 2px rgba(0,0,0,0.08)",
    "0px 5px 6px -3px rgba(0,0,0,0.06),0px 9px 12px 1px rgba(0,0,0,0.04),0px 3px 16px 2px rgba(0,0,0,0.08)",
    "0px 6px 6px -3px rgba(0,0,0,0.06),0px 10px 14px 1px rgba(0,0,0,0.04),0px 4px 18px 3px rgba(0,0,0,0.08)",
    "0px 6px 7px -4px rgba(0,0,0,0.06),0px 11px 15px 1px rgba(0,0,0,0.04),0px 4px 20px 3px rgba(0,0,0,0.08)",
    "0px 7px 8px -4px rgba(0,0,0,0.06),0px 12px 17px 2px rgba(0,0,0,0.04),0px 5px 22px 4px rgba(0,0,0,0.08)",
    "0px 7px 8px -4px rgba(0,0,0,0.06),0px 13px 19px 2px rgba(0,0,0,0.04),0px 5px 24px 4px rgba(0,0,0,0.08)",
    "0px 7px 9px -4px rgba(0,0,0,0.06),0px 14px 21px 2px rgba(0,0,0,0.04),0px 5px 26px 4px rgba(0,0,0,0.08)",
    "0px 8px 9px -5px rgba(0,0,0,0.06),0px 15px 22px 2px rgba(0,0,0,0.04),0px 6px 28px 5px rgba(0,0,0,0.08)",
    "0px 8px 10px -5px rgba(0,0,0,0.06),0px 16px 24px 2px rgba(0,0,0,0.04),0px 6px 30px 5px rgba(0,0,0,0.08)",
    "0px 8px 11px -5px rgba(0,0,0,0.06),0px 17px 26px 2px rgba(0,0,0,0.04),0px 6px 32px 5px rgba(0,0,0,0.08)",
    "0px 9px 11px -5px rgba(0,0,0,0.06),0px 18px 28px 2px rgba(0,0,0,0.04),0px 7px 34px 6px rgba(0,0,0,0.08)",
    "0px 9px 12px -6px rgba(0,0,0,0.06),0px 19px 29px 2px rgba(0,0,0,0.04),0px 7px 36px 6px rgba(0,0,0,0.08)",
    "0px 10px 13px -6px rgba(0,0,0,0.06),0px 20px 31px 3px rgba(0,0,0,0.04),0px 8px 38px 7px rgba(0,0,0,0.08)",
    "0px 10px 13px -6px rgba(0,0,0,0.06),0px 21px 33px 3px rgba(0,0,0,0.04),0px 8px 40px 7px rgba(0,0,0,0.08)",
    "0px 10px 14px -6px rgba(0,0,0,0.06),0px 22px 35px 3px rgba(0,0,0,0.04),0px 8px 42px 7px rgba(0,0,0,0.08)",
    "0px 11px 14px -7px rgba(0,0,0,0.06),0px 23px 36px 3px rgba(0,0,0,0.04),0px 9px 44px 8px rgba(0,0,0,0.08)",
    "0px 11px 15px -7px rgba(0,0,0,0.06),0px 24px 38px 3px rgba(0,0,0,0.04),0px 9px 46px 8px rgba(0,0,0,0.08)",
  ] as [
    "none",
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ],
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: "2px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48,
          padding: "8px 22px",
          transition: "all 0.3s ease-in-out",
          "&.Mui-focusVisible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: "2px",
          },
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.1)",
          },
          "&:active": {
            boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
            transform: "translateY(0px)",
          },
        },
        outlined: {
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
        sizeLarge: {
          minHeight: 56,
          fontSize: "1.1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 24px 0 rgba(0, 0, 0, 0.1)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease-in-out",
        },
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.06)",
        },
        elevation3: {
          boxShadow: "0 8px 24px 0 rgba(0, 0, 0, 0.07)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 56,
        },
        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 56,
          minWidth: 96,
          fontWeight: 600,
          "@media (min-width: 600px)": {
            minWidth: 120,
          },
          "&.Mui-selected": {
            color: "primary.main",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
  },
};

// Create the light theme with enhanced settings
const lightThemeBase = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: "light",
    primary: {
      main: "#336699",
    },
    secondary: {
      main: "#546e7a",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#202124",
      secondary: "#5f6368",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
    },
    success: {
      main: "#1B5E20",
      light: "#2E7D32",
      dark: "#004D40",
      contrastText: "#FFFFFF",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      focus: "rgba(0, 0, 0, 0.12)",
    },
    contrastThreshold: 4.5,
  },
});

// Create the dark theme with enhanced settings
const darkThemeBase = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: "dark",
    primary: {
      main: "#6699cc",
    },
    secondary: {
      main: "#90a4ae",
    },
    background: {
      default: "#1a1c20",
      paper: "#2a2d32",
    },
    text: {
      primary: "#e1e3e6",
      secondary: "#a1a4a9",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
    },
    success: {
      main: "#388E3C",
      light: "#4CAF50",
      dark: "#1B5E20",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    action: {
      active: "rgba(255, 255, 255, 0.7)",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      focus: "rgba(255, 255, 255, 0.12)",
    },
    contrastThreshold: 4.5,
  },
});

// Apply responsive font sizes
export const lightTheme = responsiveFontSizes(lightThemeBase);
export const darkTheme = responsiveFontSizes(darkThemeBase);
