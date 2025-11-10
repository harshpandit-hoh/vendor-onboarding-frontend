import axios from "axios";
import type { IMessage, IState } from "../interface";
import { initialState } from "../utility";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

if (!baseUrl) {
  throw new Error("VITE_API_BASE_URL is not defined in your .env file.");
}

export async function initiateChat(): Promise<IMessage[]> {
  try {
    const response = await fetch(`${baseUrl}/chat/initiate`);
    if (!response.ok) throw new Error("Network response was not ok.");

    const data = await response.json();
    return data.history;
  } catch (error) {
    console.error("Failed to initiate chat:", error);
    return [
      {
        role: "model",
        parts: [
          {
            text: "Sorry, I'm having trouble connecting. Please try refreshing the page.",
          },
        ],
      },
    ];
  }
}

const handleSend = async (
  input: string,
  messages: IMessage[],
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
): Promise<IState> => {
  try {
    const response = await axios.post<{
      reply: string;
      history: IMessage[];
      state: IState;
    }>(`${baseUrl}/chat`, {
      message: input,
      conversationHistory: messages,
    });

    setMessages(response.data.history);
    return response.data.state;
  } catch (error) {
    console.error("Error communicating with the AI agent:", error);
    const errorMessage: IMessage = {
      role: "model",
      parts: [
        {
          text: "Sorry, I'm having trouble connecting to my brain right now.",
        },
      ],
    };
    setMessages((prev) => [...prev, errorMessage]);
    return initialState();
  }
};

export { handleSend };
