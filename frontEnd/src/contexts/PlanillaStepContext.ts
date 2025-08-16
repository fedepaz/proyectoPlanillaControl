import { createContext } from "react";

interface PlanillaStepContextType {
  currentStep: number | null;
}

export const PlanillaStepContext = createContext<PlanillaStepContextType>({
  currentStep: null,
});
