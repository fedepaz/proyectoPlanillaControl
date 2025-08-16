"use client";

import { useTheme, useMediaQuery } from "@mui/material";

import { useAuth } from "../../../hooks/useAuth";
import ContextualHelpModalDesktop from "./ContextualHelpModalDesktop";
import ContextualHelpModalMobile from "./ContextualHelpModalMobile";
import { helpDescriptions } from "../../../actions/helpDescription";

interface ContextualHelpModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContextualHelpModal({
  open,
  onClose,
}: ContextualHelpModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { currentView } = useAuth();
  const helpDescription = helpDescriptions[currentView];

  // Si no hay descripción para esta vista, no renderizar nada
  if (!helpDescription) return null;

  return isMobile ? (
    <ContextualHelpModalMobile
      open={open}
      onClose={onClose}
      helpDescription={helpDescription}
    />
  ) : (
    <ContextualHelpModalDesktop
      open={open}
      onClose={onClose}
      helpDescription={helpDescription}
    />
  );
}
