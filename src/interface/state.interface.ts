/* eslint-disable @typescript-eslint/no-explicit-any */
interface IStage {
  status: "pending" | "resolved";
  data: { [key: string]: any } | string | null;
  attempts: number;
}

interface IState {
  currentStage: string;
  stages: {
    [key: string]: IStage;
  };
}

export type { IState, IStage };
