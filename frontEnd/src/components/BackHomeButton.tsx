import { IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

interface BackHomeButtonProps {
  onComeBackHome: (data: boolean) => void;
}

export default function BackHomeButton({
  onComeBackHome,
}: BackHomeButtonProps) {
  const onComeBackHomeButton = () => {
    console.log("BackHomeButton");
    onComeBackHome(true);
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
