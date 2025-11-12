import { marked } from "marked";
import React, { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { handleSend } from "../api";
import type { IMessage, IState } from "../interface";

function ChatWindow(props: {
  messages: IMessage[];
  isLoading: boolean;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  setCurrentState: React.Dispatch<React.SetStateAction<IState>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const q1 = "How many People logged in the today?",
  //   q2 = "What were the actions taken last week?";
  const [searchParams] = useSearchParams();
  const vendor_id = searchParams.get("vid") ?? "39";

  const [input, setInput] = useState("");
  const handleSendHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || props.isLoading) return;

    const userMessage: IMessage = { role: "user", parts: [{ text: input }] };
    props.setMessages((prev) => [...prev, userMessage]);
    setInput("");
    props.setIsLoading(true);

    await handleSend(input, props.messages, props.setMessages, vendor_id)
      .then((res) => {
        console.log(res);
        props.setCurrentState(res);
      })
      .finally(() => {
        props.setIsLoading(false);
        return 0;
      });
  };

  return (
    <div className="chat-container" style={{}}>
      <div className="chat-window">
        {props.messages.map((msg, index) => {
          const messageText = msg.parts[0]?.text;
          if (!messageText) return null;

          return (
            <div key={index} className={`chat-bubble ${msg.role}`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(messageText),
                }}
              />
            </div>
          );
        })}
        {props.isLoading && (
          <div className="chat-bubble model">
            <div className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
        <div ref={props.chatEndRef} />
      </div>
      {/*<div className="sample_questions">
        <div
          className="question_bubble"
          onClick={() => {
            setInput(q1);
          }}
        >
          {q1}
        </div>
        <div
          className="question_bubble"
          onClick={() => {
            setInput(q2);
          }}
        >
          {q2}
        </div>
      </div> */}
      <form className="chat-input-form" onSubmit={handleSendHandler}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Let's get you onboarded..."
          disabled={props.isLoading}
        />
        <button type="submit" disabled={props.isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
