import { useState, useEffect, useRef } from "react";
import type { IState, IStage } from "../interface";

function usePrevious(value: IState) {
  const ref = useRef<IState | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function formatLabel(key: string): string {
  if (key.includes("_CONFIRMATION") || key.includes("COMPLETED")) {
    return "";
  }
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getDisplayValue(stage: IStage): string {
  if (stage.status !== "resolved" || !stage.data) {
    return "---";
  }
  if (typeof stage.data === "string") {
    return stage.data;
  }
  const value = Object.values(stage.data)[0];
  return typeof value === "string" ? value : JSON.stringify(value);
}

function Preview(props: { currentState: IState }) {
  const { currentState } = props;
  const [updatedStageKey, setUpdatedStageKey] = useState<string | null>(null);
  const prevState = usePrevious(currentState);

  useEffect(() => {
    if (!prevState) return;
    const changedKey = Object.keys(currentState.stages).find((key) => {
      const prevStage = prevState.stages[key];
      const currentStage = currentState.stages[key];
      return (
        prevStage &&
        prevStage.status === "resolved" &&
        currentStage.status === "resolved" &&
        JSON.stringify(prevStage.data) !== JSON.stringify(currentStage.data)
      );
    });

    if (changedKey) {
      setUpdatedStageKey(changedKey);
      const timer = setTimeout(() => setUpdatedStageKey(null), 500);
      return () => clearTimeout(timer);
    }
  }, [currentState, prevState]);

  return (
    <div className="preview-panel">
      <h2 className="preview-title">Application Status</h2>
      <div className="preview-fields-container">
        {Object.entries(currentState.stages).map(([stageKey, stageValue]) => {
          const label = formatLabel(stageKey);
          if (!label) return null;

          const isResolved = stageValue.status === "resolved";
          const isCurrent = currentState.currentStage === stageKey;
          const isUpdated = updatedStageKey === stageKey;

          return (
            <div
              key={stageKey}
              className={`preview-field ${isResolved ? "resolved" : ""} ${
                isCurrent ? "current" : ""
              } ${isUpdated ? "updated" : ""}`}
            >
              <label>{label}</label>
              <span className="preview-value">
                {getDisplayValue(stageValue)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Preview;
