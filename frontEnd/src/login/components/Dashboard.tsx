import { Button, Container, Paper } from "@mui/material";
interface DashboardProps {
  onGeneratePlanillas: (data: boolean) => void;
}

export function Dashboard({ onGeneratePlanillas }: DashboardProps) {
  const handleGenerarPlanillas = () => {
    onGeneratePlanillas(true);
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
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleGenerarPlanillas}
        >
          Generar Planillas
        </Button>
      </Paper>
    </Container>
  );
}
