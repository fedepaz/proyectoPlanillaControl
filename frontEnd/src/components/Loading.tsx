import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h4" mt={2}>
        Loading...
      </Typography>
    </Box>
  );
}
