"use client";

import { useTheme, useMediaQuery } from "@mui/material";
import { successHelpDescription } from "../../../actions/helpDescription";
import SuccessHelpModalDesktop from "./SuccessHelpModalDesktop";
import SuccessHelpModalMobile from "./SuccessHelpModalMobile";

interface SuccessHelpModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessHelpModal({
  open,
  onClose,
}: SuccessHelpModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!open) return null;

  return isMobile ? (
    <SuccessHelpModalMobile
      onClose={onClose}
      helpDescription={successHelpDescription}
    />
  ) : (
    <SuccessHelpModalDesktop
      onClose={onClose}
      helpDescription={successHelpDescription}
    />
  );
}
