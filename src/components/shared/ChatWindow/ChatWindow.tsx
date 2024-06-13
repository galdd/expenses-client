import React, { useState, useEffect } from "react";
import "./ChatWindow.css";
import useDialogFlow from "../../hooks/useDialogflow";

const ChatWindow = () => {
  const { messages, sendMessage } = useDialogFlow();
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = async () => {
    if (inputMessage.trim() === "") return;
    sendMessage(inputMessage);
    setInputMessage("");
  };

  useEffect(() => {
    setInputMessage("");
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">Chat</div>
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
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;