import { Button, Container, Grid, Paper } from "@mui/material";
interface DashboardProps {
  onGeneratePlanillas: (data: boolean) => void;
}

export default function Dashboard({ onGeneratePlanillas }: DashboardProps) {
  const handleGenerarPlanillas = () => {
    onGeneratePlanillas(true);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 0 }}>
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
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleGenerarPlanillas}
            >
              Generar Planillas
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
