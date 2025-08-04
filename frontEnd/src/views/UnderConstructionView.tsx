import { UnderConstruction } from "../components/UnderConstruction";
import { View } from "../types/types";
import { featureDescriptions } from "./featureDescriptions";

export function createUnderConstructionView(view: View) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function UnderConstructionWrapper(props: any) {
    const feature = featureDescriptions[view];
    return (
      <UnderConstruction
        featureName={feature.name}
        description={feature.description}
        estimatedTime={feature.estimatedTime}
        onBack={props.onBackHome}
      />
    );
  };
}
