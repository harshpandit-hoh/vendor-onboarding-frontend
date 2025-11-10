import { type IMessagePart } from "./messagepart.interface";

interface IMessage {
  role: "user" | "model" | "tool";
  parts: IMessagePart[];
}

export type { IMessage };
