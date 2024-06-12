import React, { useState, useEffect } from "react";
import "./ChatWindow.css";
import { useDialogFlow } from "../../hooks/useDialogflow";


const ChatWindow: React.FC = () => {
  const { messages, sendMessage } = useDialogFlow();
  const [input, setInput] = useState("");

  useEffect(() => {
    // Send initial message
    sendMessage("hello, I am ofir, how can I help you today?");
  }, [sendMessage]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">Chat</div>
      <div className="chat-body">
        {messages && messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;