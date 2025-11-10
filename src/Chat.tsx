import { marked } from "marked";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { IMessage, IState } from "./interface";
import { handleSend, initiateChat } from "./api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { initialState } from "./utility";

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [currentState, setCurrentState] = useState<IState>(initialState());
  // const q1 = "How many People logged in the today?",
  //   q2 = "What were the actions taken last week?";
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const startConversation = async () => {
      setIsLoading(true);
      const initialHistory = await initiateChat();
      setMessages(initialHistory);
      setIsLoading(false);
    };

    startConversation();
  }, []);

  const handleSendHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: IMessage = { role: "user", parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await handleSend(input, messages, setMessages)
      .then((res) => {
        console.log(res);
        setCurrentState(res);
      })
      .finally(() => {
        setIsLoading(false);
        return 0;
      });
  };

  const handleSaveChat = useCallback(() => {
    const chatElement = chatWindowRef.current; // This is .main-layout
    if (!chatElement) return;
    chatElement.classList.add("preparing-for-save");

    html2canvas(chatElement, {
      scale: 2,
      useCORS: true,
      onclone: () => {},
    }).then((canvas) => {
      chatElement.classList.remove("preparing-for-save");

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / pdfWidth;
      const imgHeight = canvasHeight / ratio;

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const date = new Date().toISOString().slice(0, 10);
      pdf.save(`chat-log-${date}.pdf`);
    });
  }, []);

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
      <div className="json-display-container">
        <pre>
          <code>{JSON.stringify(currentState, null, 2)}</code>
        </pre>
      </div>
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        chatEndRef={chatEndRef}
        handleSendHandler={handleSendHandler}
        handleSaveChat={handleSaveChat}
        input={input}
        setInput={setInput}
      />
    </div>
  );
}

function ChatWindow(props: {
  messages: IMessage[];
  isLoading: boolean;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  handleSendHandler: (e: FormEvent) => void;
  handleSaveChat: () => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) {
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
      <form className="chat-input-form" onSubmit={props.handleSendHandler}>
        <input
          type="text"
          value={props.input}
          onChange={(e) => props.setInput(e.target.value)}
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
