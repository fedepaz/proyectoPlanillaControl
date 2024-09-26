import { createTheme } from "@mui/material/styles";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3a73b2", // Blue-gray for accents
      contrastText: "#ffffff",
    },
    background: {
      default: "#d0d3d8", // Darker grayish blue
      paper: "#e0e3e8", // Slightly lighter grayish blue
    },
    text: {
      primary: "#202124", // Darker gray for text
      secondary: "#606368", // Medium gray
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6c96c5", // Lighter blue-gray for accents
      contrastText: "#1a1c20", // Dark text to contrast with lighter blueish elements
    },
    background: {
      default: "#2a2d32", // Lighter dark gray with blue tint
      paper: "#36393e", // Slightly lighter gray for paper components
    },
    text: {
      primary: "#dce0e5", // Lighter grayish-white text
      secondary: "#9aa0a6", // Light grayish-blue for secondary text
    },
  },
});
