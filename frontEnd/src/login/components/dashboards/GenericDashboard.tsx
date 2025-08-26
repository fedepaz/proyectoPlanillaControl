"use client";
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { User, ActionButton } from "../../../actions/types";

interface Kpi {
  title: string;
  value: string | number;
}

interface GenericDashboardProps {
  user: User & {
    hierarchy?: string;
    role?: string;
    dni?: string;
  };
  title: string;
  sections: { title: string; actions: ActionButton[] }[];
  kpis?: Kpi[];
}

export function GenericDashboard({
  user,
  title,
  sections,
  kpis,
}: GenericDashboardProps) {
  const renderActionButtons = (actions: ActionButton[]) => (
    <Grid container spacing={2}>
      {actions.map((action) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={action.id}>
          <Button
            fullWidth
            variant={action.primary ? "contained" : "outlined"}
            startIcon={action.icon}
            onClick={action.onClick}
            sx={{ p: 1.5, height: "100%" }}
          >
            {action.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: { xs: 2, md: 3 }, my: 2, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido, {user.hierarchy?.toUpperCase()}!
        </Typography>

        {kpis && kpis.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {kpis.map((kpi) => (
              <Grid item xs={12} sm={4} key={kpi.title}>
                <Card sx={{ textAlign: "center", p: 1 }}>
                  <CardContent>
                    <Typography variant="subtitle1">{kpi.title}</Typography>
                    <Typography variant="h4" component="p">
                      {kpi.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {sections.map((section, index) => (
          <Box key={index}>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
              {title}
            </Typography>
            {renderActionButtons(section.actions)}
          </Box>
        ))}
      </Paper>
    </Container>
  );
}
