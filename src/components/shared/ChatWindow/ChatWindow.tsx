import React, { useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import "./ChatWindow.css";
import useDialogflow from "../../hooks/useDialogflow";

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([
    { text: "Hello, I am AI. How can I help you?", sender: "AI" },
  ]);
  const { sendMessage } = useDialogflow();

  const handleSend = async (message: string) => {
    if (message.trim() === "") return;

    const userMessage = { text: message, sender: "User" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await sendMessage(message);
      console.log("Response from server:", response);
      const aiMessage = { text: response.response, sender: "AI" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      if (response.intent === "create_list" && response.parameters.listName) {
        // Here we can handle the specific logic for create_list intent
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { text: "Sorry, something went wrong.", sender: "AI" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
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
            onClick={(e) => {
              const input = e.currentTarget.previousSibling as HTMLInputElement;
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