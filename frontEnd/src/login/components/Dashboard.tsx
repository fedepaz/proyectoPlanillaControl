
"use client";

import { memo } from "react";
import { User, UserRole } from "../../actions/types";
import { useDashboardActions } from "../../actions";
import { View } from "../../types/types";
import { Box, CircularProgress, Container } from "@mui/material";
import { ModernDashboardLayout } from "./layout/ModernDashboardLayout";
import { GenericDashboard } from "./dashboards/GenericDashboard";

interface DashboardProps {
  onGeneratePlanillas?: () => void;
  onHistorialSupervisores?: () => void;
  onHistorialResponsables?: () => void;
  onHistorialAuxiliares?: () => void;
  onUserRoles?: () => void;
  onReports?: () => void;
  onViewHistory?: () => void;
  onViewProfile?: () => void;
  onOpenSettings?: () => void;
  onManageUsers?: () => void;
  onNavigate?: (view: View) => void;
  user: User;
  mobileOpen: boolean;
  onToggleDrawer: () => void;
}

const Dashboard = memo(function Dashboard(props: DashboardProps) {
  const {
    mainActions,
    accountActions,
    settingsActions,
    reportsActions,
    adminActions,
    effectiveRoles,
  } = useDashboardActions(
    {
      onGeneratePlanillas: props.onGeneratePlanillas,
      onHistorialSupervisores: props.onHistorialSupervisores,
      onHistorialResponsables: props.onHistorialResponsables,
      onHistorialAuxiliares: props.onHistorialAuxiliares,
      onUserRoles: props.onUserRoles,
      onReports: props.onReports,
      onViewHistory: props.onViewHistory,
      onViewProfile: props.onViewProfile,
      onOpenSettings: props.onOpenSettings,
      onManageUsers: props.onManageUsers,
      onNavigate: props.onNavigate,
    },
    props.user
  );

  const sections = [
    { label: "General", actions: mainActions },
    { label: "Reportes", actions: reportsActions },
    { label: "Administración", actions: adminActions },
    { label: "Configuración", actions: settingsActions },
    { label: "Cuenta", actions: accountActions },
  ];

  const renderDashboardPage = (selectedTab: number) => {
    if (!effectiveRoles) {
      return (
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        </Container>
      );
    }

    const kpis = [
      { title: "Planillas Hoy", value: 12 },
      { title: "Pendientes", value: 3 },
      { title: "Auxiliares Activos", value: 8 },
    ];

    return (
      <GenericDashboard
        user={props.user}
        title={sections[selectedTab]?.label || "Dashboard"}
        sections={[{ title: sections[selectedTab]?.label, actions: sections[selectedTab]?.actions || [] }]}
        kpis={effectiveRoles.includes(UserRole.RESPONSABLE) ? kpis : []}
      />
    );
  };

  return (
    <ModernDashboardLayout
      sections={sections}
      mobileOpen={props.mobileOpen}
      onDrawerToggle={props.onToggleDrawer}
    >
      {renderDashboardPage}
    </ModernDashboardLayout>
  );
});

export default Dashboard;
