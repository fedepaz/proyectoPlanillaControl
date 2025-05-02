"use client";

import { type ReactNode, useRef } from "react";
import { Box } from "@mui/material";
import { TouchRipple, type TouchRippleRef } from "./TouchRipple";

interface TouchFeedbackProps {
  children: ReactNode;
  disabled?: boolean;
}

export function TouchFeedback({
  children,
  disabled = false,
}: TouchFeedbackProps) {
  const rippleRef = useRef<TouchRippleRef>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    if (!disabled && rippleRef.current) {
      rippleRef.current.start(event);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!disabled && rippleRef.current) {
      rippleRef.current.stop(event);
    }
  };

  return (
    <Box
      sx={{ position: "relative", overflow: "hidden" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchEnd}
    >
      {children}
      {!disabled && <TouchRipple ref={rippleRef} />}
    </Box>
  );
}
