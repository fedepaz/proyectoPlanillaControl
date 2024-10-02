import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { PlanillasNavbar } from "./components/PlanillasNavBar";
import { PlanillasProvider } from "./planillas/components/PlanillasProvider";
import { darkTheme, lightTheme } from "./types/theme";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { LoginPage } from "./login/components/LoginPage";

export function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleColorMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minHeight: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <PlanillasNavbar toggleColorMode={toggleColorMode} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              overflowY: "hidden",
              WebkitOverflowScrolling: "touch",
              p: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <LoginPage />

            {/*
            <PlanillasProvider />
            */}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
