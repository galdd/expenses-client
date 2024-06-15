import React, { useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import "./ChatWindow.css";
import useDialogFlow from "../../hooks/useDialogFlow";

interface ChatWindowProps {
  onCreateList: (list: any) => void;
  onUpdateList: (listId: string, name: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onCreateList, onUpdateList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isLoading, error } = useDialogFlow(onCreateList, onUpdateList);

  const handleSend = (message: string) => {
    if (message.trim() === "") return;
    console.log("Sending message to server:", message);
    sendMessage(message);
  };

  return (
    <>
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>Chat</div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender.toLowerCase()}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type your message..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSend(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector(".chat-footer input") as HTMLInputElement;
              handleSend(input.value);
              input.value = "";
            }}
          >
            Send
          </button>
        </div>
      </div>
      {!isOpen && (
        <div className="chat-toggle-button" onClick={() => setIsOpen(!isOpen)}>
          <CommentOutlined style={{ fontSize: '24px', color: 'white' }} />
        </div>
      )}
    </>
  );
};

export default ChatWindow;