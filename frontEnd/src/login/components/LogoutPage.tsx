import { Button, CircularProgress, Container, Paper } from "@mui/material";
import { useLogout } from "../services/logout";
import { LogoutSchema } from "../types/modelsSchema";

export function LogoutPage({ darkMode }: { darkMode: boolean }) {
  const { mutate: logout, isPending } = useLogout();

  const onSubmit = (data: LogoutSchema) => {
    logout(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color={darkMode ? "error" : "warning"}
          sx={{ mt: 3, mb: 2 }}
          disabled={isPending}
          onClick={() => {
            onSubmit({ email: "fedepaz@gmail.com" });
          }}
        >
          {isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Cerrar sesión"
          )}
        </Button>
      </Paper>
    </Container>
  );
}
