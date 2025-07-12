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
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 500,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 500,
      letterSpacing: "0em",
    },
    h4: {
      fontWeight: 500,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 500,
      letterSpacing: "0em",
    },
    h6: {
      fontWeight: 500,
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
      fontWeight: 500,
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
    borderRadius: 8,
  },
  // Enhanced component overrides with snackbar and button improvements
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
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out", // ADDED: Smooth transitions
          "&.Mui-focusVisible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: "2px",
          },
          // ADDED: Enhanced hover effects
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
          },
        },
        contained: {
          boxShadow: "none",
          fontWeight: 600, // ADDED: Bolder text for contained buttons
          "&:hover": {
            boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
          },
          "&:active": {
            boxShadow: "none",
            transform: "translateY(0px)",
          },
        },
        outlined: {
          fontWeight: 500, // ADDED: Medium weight for outlined buttons
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
        sizeLarge: {
          minHeight: 56,
          fontSize: "1rem",
        },
      },
      // ADDED: Variants for special button types
      variants: [
        {
          props: { variant: "contained", color: "success" },
          style: {
            backgroundColor: "#4caf50",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#388e3c",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 16px 0 rgba(76, 175, 80, 0.3)",
            },
          },
        },
      ],
    },
    // ADDED: Global Snackbar styling
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiAlert-root": {
            borderRadius: 12,
            fontWeight: 500,
            fontSize: "0.875rem",
            boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    // ADDED: Global Alert styling for snackbars
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
          "& .MuiAlert-icon": {
            fontSize: "1.2rem",
          },
        },
        // Success alerts
        filledSuccess: {
          backgroundColor: "#4caf50",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
        // Error alerts
        filledError: {
          backgroundColor: "#f44336",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
        // Warning alerts
        filledWarning: {
          backgroundColor: "#ff9800",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
        // Info alerts
        filledInfo: {
          backgroundColor: "#2196f3",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12,
          transition: "all 0.2s ease-in-out", // ADDED: Smooth transitions
          "&:hover": {
            transform: "scale(1.05)", // ADDED: Subtle scale effect
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease-in-out", // ADDED: Smooth transitions
          "&:hover": {
            boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)", // ADDED: Enhanced hover shadow
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
        },
        elevation2: {
          boxShadow: "0 3px 10px 0 rgba(0, 0, 0, 0.12)",
        },
        elevation3: {
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.14)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 56,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 56,
          minWidth: 96,
          "@media (min-width: 600px)": {
            minWidth: 120,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 64,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: "12px 0",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 36,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.875rem",
          padding: "8px 12px",
          borderRadius: 6,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "16px 0",
        },
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        ripple: {
          opacity: 0.24,
        },
        child: {
          animationDuration: "450ms",
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
      main: "#3a73b2",
      light: "#6c96c5",
      dark: "#2a5080",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#607d8b",
      light: "#8eacbb",
      dark: "#34515e",
      contrastText: "#ffffff",
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
      main: "#1B5E20", // deep “forest” green
      light: "#2E7D32", // still dark enough to read white text
      dark: "#004D40", // for hover states
      contrastText: "#FFFFFF", // guaranteed white
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
  },
  // ADDED: Light mode specific component overrides
  components: {
    ...commonThemeSettings.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.3)",
        },
        elevation2: {
          boxShadow: "0 3px 10px 0 rgba(0, 0, 0, 0.35)",
        },
        elevation3: {
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.4)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        ...commonThemeSettings.components.MuiButton?.styleOverrides,
        contained: {
          backgroundColor: "#6c96c5",
          "&:hover": {
            backgroundColor: "#4a77a8",
            transform: "translateY(-1px)",
            boxShadow: "0 6px 16px 0 rgba(108, 150, 197, 0.3)",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        ...commonThemeSettings.components.MuiAlert?.styleOverrides,
        // Light mode specific alert colors
        filledSuccess: {
          backgroundColor: "#1B5E20", // very deep green
          color: "#FFFFFF",
          border: "1px solid #2E7D32", // slightly lighter edge
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          "& .MuiAlert-icon": { color: "#FFFFFF" },
        },
        filledError: {
          backgroundColor: "#f44336",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
        filledWarning: {
          backgroundColor: "#ff9800",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
        filledInfo: {
          backgroundColor: "#2196f3",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
      },
    },
  },
});

// Create the dark theme with enhanced settings
const darkThemeBase = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: "dark",
    primary: {
      main: "#6c96c5",
      light: "#9db8d9",
      dark: "#4a77a8",
      contrastText: "#1a1c20",
    },
    secondary: {
      main: "#78909c",
      light: "#a7c0cd",
      dark: "#4b636e",
      contrastText: "#1a1c20",
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
      main: "#388E3C", // rich forest green
      light: "#4CAF50", // a touch brighter for accent
      dark: "#1B5E20", // strong contrast for hover
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
  },
  // Dark mode specific component overrides
  components: {
    ...commonThemeSettings.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.3)",
        },
        elevation2: {
          boxShadow: "0 3px 10px 0 rgba(0, 0, 0, 0.35)",
        },
        elevation3: {
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.4)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        ...commonThemeSettings.components.MuiButton?.styleOverrides,
        contained: {
          backgroundColor: "#6c96c5",
          "&:hover": {
            backgroundColor: "#4a77a8",
            transform: "translateY(-1px)",
            boxShadow: "0 6px 16px 0 rgba(108, 150, 197, 0.3)",
          },
        },
      },
    },
    // ADDED: Dark mode specific alert colors
    MuiAlert: {
      styleOverrides: {
        ...commonThemeSettings.components.MuiAlert?.styleOverrides,
        filledSuccess: {
          backgroundColor: "#388E3C",
          color: "#FFFFFF",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.4)", // subtle shadow
          "& .MuiAlert-icon": { color: "#FFFFFF" },
        },
        filledError: {
          backgroundColor: "#f44336",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
        filledWarning: {
          backgroundColor: "#ff9800",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
        filledInfo: {
          backgroundColor: "#29b6f6",
          color: "#ffffff",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        ripple: {
          opacity: 0.32,
        },
      },
    },
  },
});

// Apply responsive font sizes
export const lightTheme = responsiveFontSizes(lightThemeBase);
export const darkTheme = responsiveFontSizes(darkThemeBase);
