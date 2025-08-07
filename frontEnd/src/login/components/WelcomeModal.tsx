"use client";
import type React from "react";

import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  Assignment as AssignmentIcon,
  Speed as SpeedIcon,
  CloudSync as CloudSyncIcon,
} from "@mui/icons-material";
import WelcomeModalMobile from "./WelcomeMobile";
import WelcomeLargeMobile from "./WelcomeLarge";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

const features = [
  {
    icon: <AssignmentIcon />,
    title: "Gestión de Planillas",
    description:
      "Crea y administra tus planillas de forma digital y organizada",
  },

  {
    icon: <SpeedIcon />,
    title: "Proceso Rápido",
    description: "Genera y procesa planillas en minutos, no en horas",
  },
  {
    icon: <CloudSyncIcon />,
    title: "Acceso Desde Cualquier Lugar",
    description:
      "Accede a tus planillas desde cualquier dispositivo, en cualquier momento",
  },
];

//const benefits = [
//  {
//    icon: <Security sx={{ fontSize: 20 }} />,
//    text: "Seguridad empresarial certificada",
//  },
//  {
//    icon: <TrendingUp sx={{ fontSize: 20 }} />,
//    text: "Incrementa productividad hasta 300%",
//  },
//  {
//    icon: <Groups sx={{ fontSize: 20 }} />,
//    text: "Soporte técnico especializado 24/7",
//  },
//];
//
//const stats = [
//  { number: "10,000+", label: "Empresas activas" },
//  { number: "99.9%", label: "Tiempo de actividad" },
//  { number: "24/7", label: "Soporte técnico" },
//];

const WelcomeModal: React.FC<WelcomeModalProps> = ({
  open,
  onClose,
  onGetStarted,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <WelcomeModalMobile
      open={open}
      onClose={onClose}
      onGetStarted={onGetStarted}
      features={features}
    />
  ) : (
    <WelcomeLargeMobile
      open={open}
      onClose={onClose}
      onGetStarted={onGetStarted}
      features={features}
    />
  );
};

export default WelcomeModal;
