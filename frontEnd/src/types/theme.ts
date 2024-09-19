import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0b57d0", // Gmail's blue
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f6f8fc", // Light gray background
    },
    text: {
      primary: "#202124", // Almost black
      secondary: "#5f6368", // Dark gray
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8ab4f8", // Light blue for dark mode
      contrastText: "#202124",
    },
    background: {
      default: "#202124", // Very dark gray
      paper: "#2d2e30", // Slightly lighter dark gray
    },
    text: {
      primary: "#e8eaed", // Off-white
      secondary: "#9aa0a6", // Light gray
    },
  },
});
