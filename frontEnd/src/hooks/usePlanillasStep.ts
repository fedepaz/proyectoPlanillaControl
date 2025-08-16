import { useContext } from "react";
import { PlanillaStepContext } from "../contexts/PlanillaStepContext";

export function usePlanillasStep() {
  return useContext(PlanillaStepContext);
}
