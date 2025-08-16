"use client";

import { useTheme, useMediaQuery } from "@mui/material";
import { HelpDescription } from "../../../actions/helpDescription";
import StepHelpModalMobile from "./StepHelpModalMobile";
import StepHelpModalDesktop from "./StepHelpModalDesktop";

interface StepHelpModalProps {
  open: boolean;
  onClose: () => void;
  helpDescription: HelpDescription;
}

export default function StepHelpModal({
  open,
  onClose,
  helpDescription,
}: StepHelpModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!open) return null;

  return isMobile ? (
    <StepHelpModalMobile onClose={onClose} helpDescription={helpDescription} />
  ) : (
    <StepHelpModalDesktop onClose={onClose} helpDescription={helpDescription} />
  );
}
