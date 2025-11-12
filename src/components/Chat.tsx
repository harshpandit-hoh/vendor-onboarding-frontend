import { useCallback, useEffect, useRef, useState } from "react";
import { initiateChat } from "../api";
import type { IMessage, IState } from "../interface";
import { initialState, saveChat } from "../utility";
import ChatWindow from "./ChatWindow";
import Preview from "./Preview";
import { useSearchParams } from "react-router-dom";

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [searchParams] = useSearchParams();
  const vendor_id = searchParams.get("vid") ?? "39";
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [currentState, setCurrentState] = useState<IState>(initialState());
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const startConversation = async () => {
      setIsLoading(true);
      const initialHistory = await initiateChat(vendor_id as string);
      setMessages(initialHistory);
      setIsLoading(false);
    };

    startConversation();
  }, []);

  const handleSaveChat = useCallback(() => saveChat(chatWindowRef), []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault();
        handleSaveChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSaveChat]);

  return (
    <div ref={chatWindowRef} className="main-layout">
      <Preview currentState={currentState} />
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        chatEndRef={chatEndRef}
        setMessages={setMessages}
        setCurrentState={setCurrentState}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
