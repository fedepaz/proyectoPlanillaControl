"use client";

import { IconButton, Tooltip, Typography, useTheme } from "@mui/material";

import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import Brightness2TwoToneIcon from "@mui/icons-material/Brightness2TwoTone";

interface ThemeModeButtonProps {
  toggleColorMode: () => void;
}

export default function ThemeModeButton({
  toggleColorMode,
}: ThemeModeButtonProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <Tooltip
      title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      arrow
      placement="bottom"
    >
      <IconButton
        color="inherit"
        onClick={toggleColorMode}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px 8px",
          borderRadius: 1,
          minWidth: "auto",
        }}
      >
        {isDarkMode ? (
          <WbSunnyTwoToneIcon
            sx={{
              fontSize: "1.1rem",
            }}
          />
        ) : (
          <Brightness2TwoToneIcon
            sx={{
              fontSize: "1.1rem",
            }}
          />
        )}
        <Typography
          variant="caption"
          component="span"
          sx={{
            fontSize: "0.65rem",
            lineHeight: 1,
            mt: 0.5,
          }}
        >
          {isDarkMode ? "Claro" : "Oscuro"}
        </Typography>
      </IconButton>
    </Tooltip>
  );
}
