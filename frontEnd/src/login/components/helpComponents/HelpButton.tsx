// src/components/HelpButton.tsx
"use client";

import { useState, useEffect, useCallback } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import {
  helpDescriptions,
  planillaStepDescriptions,
} from "../../../actions/helpDescription";
import { useAuth } from "../../../hooks/useAuth";
import ContextualHelpModal from "./ContextualHelpModal";
import { View } from "../../../types/types";
import StepHelpModal from "../../../planillas/components/planillaHelp/StepHelpModal";
import { usePlanillasStep } from "../../../hooks/usePlanillasStep";
import { HelpDescription } from "../../../actions/helpDescription";

interface HelpButtonProps {
  propStep?: number;
}

export default function HelpButton({ propStep }: HelpButtonProps) {
  const { currentView, userInfo } = useAuth();
  const { currentStep } = usePlanillasStep();
  const [showHelp, setShowHelp] = useState(false);

  const isGeneratingPlanillas = currentView === View.GENERATE_PLANILLAS;

  const isReviewing = currentStep === 6;
  const effectiveStep = isReviewing ? 6 : propStep ?? currentStep ?? 0;

  // Obtener la descripción adecuada
  const helpDescription =
    isGeneratingPlanillas && effectiveStep !== null
      ? planillaStepDescriptions[effectiveStep]
      : helpDescriptions[currentView];
  // 3. Verificar si hay ayuda disponible para esta vista/paso
  const hasHelp = !!helpDescription;

  // 4. Verificar si es la primera vez que el usuario ve esta ayuda
  const isFirstTime = useCallback(() => {
    if (!hasHelp) return false;

    const viewedKey =
      isGeneratingPlanillas && currentStep !== null
        ? `stepHelpViewed_${currentStep}_${userInfo?.user?.dni || "guest"}`
        : `contextualHelpViewed_${currentView}_${
            userInfo?.user?.dni || "guest"
          }`;

    return !localStorage.getItem(viewedKey);
  }, [currentView, currentStep, userInfo, hasHelp, isGeneratingPlanillas]);

  // 5. Mostrar automáticamente si es la primera vez
  useEffect(() => {
    if (hasHelp && isFirstTime()) {
      setShowHelp(true);

      // Marcar como visto
      const viewedKey =
        isGeneratingPlanillas && currentStep !== null
          ? `stepHelpViewed_${currentStep}_${userInfo?.user?.dni || "guest"}`
          : `contextualHelpViewed_${currentView}_${
              userInfo?.user?.dni || "guest"
            }`;

      localStorage.setItem(viewedKey, "true");
    }
  }, [
    currentView,
    currentStep,
    isGeneratingPlanillas,
    hasHelp,
    isFirstTime,
    userInfo,
  ]);

  const handleHelpClick = () => {
    setShowHelp(true);

    // Marcar como visto
    const viewedKey =
      isGeneratingPlanillas && currentStep !== null
        ? `stepHelpViewed_${currentStep}_${userInfo?.user?.dni || "guest"}`
        : `contextualHelpViewed_${currentView}_${
            userInfo?.user?.dni || "guest"
          }`;

    localStorage.setItem(viewedKey, "true");
  };

  // 6. Si no hay ayuda para esta vista, no renderizar el botón
  if (!hasHelp) return null;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleHelpClick}
        aria-label={isGeneratingPlanillas ? "Ayuda paso" : "Ayuda contextual"}
        title={isGeneratingPlanillas ? "Ayuda paso" : "Ayuda contextual"}
      >
        <HelpOutlineIcon />
      </IconButton>

      {isGeneratingPlanillas && effectiveStep !== null ? (
        <StepHelpModal
          open={showHelp}
          onClose={() => setShowHelp(false)}
          helpDescription={helpDescription as HelpDescription}
        />
      ) : (
        <ContextualHelpModal
          open={showHelp}
          onClose={() => setShowHelp(false)}
        />
      )}
    </>
  );
}
