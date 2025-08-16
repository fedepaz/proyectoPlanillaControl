import { ReactNode } from "react";
import { PlanillaStepContext } from "../contexts/PlanillaStepContext";

interface PlanillaStepProviderProps {
  step: number | null;
  children: ReactNode;
}

export const PlanillaStepProvider: React.FC<PlanillaStepProviderProps> = ({
  step,
  children,
}) => {
  return (
    <PlanillaStepContext.Provider value={{ currentStep: step }}>
      {children}
    </PlanillaStepContext.Provider>
  );
};
