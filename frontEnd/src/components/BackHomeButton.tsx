import { IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";

interface BackHomeButtonProps {
  onComeBackHome: (data: boolean) => void;
}

export default function BackHomeButton({
  onComeBackHome,
}: BackHomeButtonProps) {
  const [showHomePage, setShowHomePage] = useState(false);

  const onComeBackHomeButton = () => {
    setShowHomePage(true);
    onComeBackHome(showHomePage);
  };

  return (
    <IconButton
      color="inherit"
      onClick={onComeBackHomeButton}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <HomeIcon />
      <Typography variant="caption" component="span" sx={{ ml: 1 }}>
        Regresar{" "}
      </Typography>{" "}
    </IconButton>
  );
}
