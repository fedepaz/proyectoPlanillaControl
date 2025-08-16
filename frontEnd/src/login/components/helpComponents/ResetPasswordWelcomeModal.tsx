// src/login/components/ResetPasswordWelcomeModal.tsx
"use client";

import { useTheme, useMediaQuery } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockIcon from "@mui/icons-material/Lock";
import ResetPasswordWelcomeModalDesktop from "./ResetPasswordWelcomeModalDesktop";
import ResetPasswordWelcomeModalMobile from "./ResetPasswordWelcomeModalMobile";

interface ResetPasswordWelcomeModalProps {
  open: boolean;

  onGetStarted: () => void;
}

const resetFeatures = [
  {
    step: "1",
    title: "Solicita el cambio",
    description:
      "Ingresa tu email y haz clic en 'Enviar solicitud'. Esto notificará al administrador que necesitas cambiar tu contraseña.",
    icon: EmailIcon,
  },
  {
    step: "2",
    title: "Espera la aprobación",
    description:
      "Un administrador debe aprobar manualmente tu solicitud. **NO es automático**. El tiempo de espera varía según la disponibilidad del administrador.",
    icon: HourglassBottomIcon,
  },
  {
    step: "3",
    title: "Revisa diariamente",
    description:
      "Debes revisar **DIARIAMENTE** si tu solicitud fue aprobada. **NO recibirás notificación por email** (esto se implementará próximamente).",
    icon: CalendarTodayIcon,
  },
  {
    step: "4",
    title: "Cambia tu contraseña",
    description:
      "Si fue aprobada, podrás establecer una nueva contraseña segura. Si no, debes esperar y revisar nuevamente al día siguiente.",
    icon: LockIcon,
  },
];

export const ResetPasswordWelcomeModal: React.FC<
  ResetPasswordWelcomeModalProps
> = ({ open, onGetStarted }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <ResetPasswordWelcomeModalMobile
      open={open}
      onGetStarted={onGetStarted}
      features={resetFeatures}
    />
  ) : (
    <ResetPasswordWelcomeModalDesktop
      open={open}
      onGetStarted={onGetStarted}
      features={resetFeatures}
    />
  );
};
