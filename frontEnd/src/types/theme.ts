import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { TypographyProps } from "@mui/material/styles/createTypography";

// Common theme settings for both light and dark modes
const commonThemeSettings = {
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
      textTransform: "none" as TypographyProps["textTransform"],
    },
    caption: {
      letterSpacing: "0.03333em",
    },
    overline: {
      letterSpacing: "0.08333em",
    },
  },
  shape: {
    borderRadius: 8, // Slightly more rounded corners for a modern look
  },
  // Mobile-optimized component overrides
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false, // Ensure ripple is enabled for touch feedback
      },
      styleOverrides: {
        root: {
          // Improve touch feedback
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
          minHeight: 48, // Larger touch target
          padding: "8px 16px",
          // Improve touch feedback
          "&.Mui-focusVisible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: "2px",
          },
        },
        contained: {
          boxShadow: "none", // Flatter design for modern look
          "&:hover": { boxShadow: "none" },
          "&:active": { boxShadow: "none" },
        },
        sizeLarge: {
          minHeight: 56, // Even larger for primary actions
          fontSize: "1rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12, // Larger touch target
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: 48, // Larger touch target for inputs
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
          borderRadius: 12, // Slightly more rounded cards
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
        elevation2: {
          boxShadow: "0 3px 10px 0 rgba(0, 0, 0, 0.12)", // Subtle shadow
        },
        elevation3: {
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.14)", // Subtle shadow
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 56, // Larger touch target
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 56, // Larger touch target
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
          height: 64, // Larger touch target
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: "12px 0", // Better spacing
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 12, // More comfortable spacing
          paddingBottom: 12,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: 12, // More comfortable spacing
          paddingBottom: 12,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 48, // Larger touch target
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 36, // Larger touch target
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.875rem", // Larger for better readability
          padding: "8px 12px",
          borderRadius: 6,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12, // More rounded dialogs
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "16px 0", // Consistent spacing
        },
      },
    },
    // Enhance touch ripple effect
    MuiTouchRipple: {
      styleOverrides: {
        ripple: {
          // Make ripple effect more visible
          opacity: 0.24,
        },
        child: {
          // Faster animation for better feedback
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
      main: "#3a73b2", // Keeping your blue-gray for accents
      light: "#6c96c5", // Lighter shade
      dark: "#2a5080", // Darker shade
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#607d8b", // Complementary blue-gray
      light: "#8eacbb",
      dark: "#34515e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f7fa", // Lighter, cleaner background
      paper: "#ffffff", // Pure white for paper elements
    },
    text: {
      primary: "#202124", // Darker gray for text
      secondary: "#5f6368", // Medium gray
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
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
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
});

// Create the dark theme with enhanced settings
const darkThemeBase = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: "dark",
    primary: {
      main: "#6c96c5", // Keeping your lighter blue-gray for accents
      light: "#9db8d9",
      dark: "#4a77a8",
      contrastText: "#1a1c20",
    },
    secondary: {
      main: "#78909c", // Complementary blue-gray
      light: "#a7c0cd",
      dark: "#4b636e",
      contrastText: "#1a1c20",
    },
    background: {
      default: "#1a1c20", // Darker background
      paper: "#2a2d32", // Slightly lighter for paper elements
    },
    text: {
      primary: "#e1e3e6", // Lighter text for better contrast
      secondary: "#a1a4a9", // Medium gray with better contrast
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
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
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
          backgroundImage: "none", // Remove default gradient in dark mode
        },
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.3)", // Darker shadow for dark mode
        },
        elevation2: {
          boxShadow: "0 3px 10px 0 rgba(0, 0, 0, 0.35)", // Darker shadow for dark mode
        },
        elevation3: {
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.4)", // Darker shadow for dark mode
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.3)", // Darker shadow for dark mode
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#6c96c5",
          "&:hover": {
            backgroundColor: "#4a77a8",
          },
        },
      },
    },
    // Enhance touch ripple effect for dark mode
    MuiTouchRipple: {
      styleOverrides: {
        ripple: {
          // Make ripple effect more visible in dark mode
          opacity: 0.32,
        },
      },
    },
  },
});

// Apply responsive font sizes
export const lightTheme = responsiveFontSizes(lightThemeBase);
export const darkTheme = responsiveFontSizes(darkThemeBase);
