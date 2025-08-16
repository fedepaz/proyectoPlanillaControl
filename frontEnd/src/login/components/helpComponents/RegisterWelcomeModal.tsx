// src/register/components/RegisterWelcomeModal.tsx
"use client";

import { useTheme, useMediaQuery } from "@mui/material";
import RegisterWelcomeModalMobile from "./RegisterWelcomeModalMobile.tsx";
import RegisterWelcomeModalDesktop from "./RegisterWelcomeModalDesktop.tsx";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

interface RegisterWelcomeModalProps {
  open: boolean;

  onGetStarted: () => void;
}

const registerFeatures = [
  {
    step: "1",

    title: "DNI",
    description:
      "Tu Documento Nacional de Identidad sin puntos. Va a ser tu identificación única en el sistema. Y con el cual se firmarán tus planillas de control.",
    icon: BadgeIcon,
  },
  {
    step: "2",

    title: "Email",
    description:
      "Tu correo electrónico principal. Lo usaremos para enviar notificaciones importantes y recuperar tu cuenta si olvidas tu contraseña.",
    icon: EmailIcon,
  },
  {
    step: "3",

    title: "Nombre y Apellido",
    description:
      "Tu nombre completo con el cual se firmarán tus planillas de control.",
    icon: PersonIcon,
  },
  {
    step: "4",

    title: "Legajo",
    description:
      "Número de legajo con el cual se firmarán tus planillas de control. =/",
    icon: AssignmentIcon,
  },
  {
    step: "5",
    title: "Jerarquía",
    description: "Jerarquía con la cual se firmarán tus planillas de control.",
    icon: WorkspacePremiumIcon,
  },
  {
    step: "6",
    title: "Unidad",
    description:
      "Selecciona el aeropuerto donde trabajas. Este se utilizará para generar tus planillas de control.",
    icon: FlightTakeoffIcon,
  },
];

export const RegisterWelcomeModal: React.FC<RegisterWelcomeModalProps> = ({
  open,

  onGetStarted,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <RegisterWelcomeModalMobile
      open={open}
      onGetStarted={onGetStarted}
      features={registerFeatures}
    />
  ) : (
    <RegisterWelcomeModalDesktop
      open={open}
      onGetStarted={onGetStarted}
      features={registerFeatures}
    />
  );
};
