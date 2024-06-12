import { useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface DialogFlowResponse {
  response: string;
  intent: string;
  parameters: any;
}

const sendToDialogFlow = async (message: string): Promise<DialogFlowResponse> => {
  const response = await fetch("http://localhost:1337/dialogflow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const useDialogFlow = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const mutation: UseMutationResult<DialogFlowResponse, Error, string> = useMutation(
    sendToDialogFlow,
    {
      onSuccess: (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `AI: ${data.response}`,
        ]);

        if (data.intent === "create_list") {
          setMessages((prevMessages) => [
            ...prevMessages,
            `List "${data.parameters.listName}" created successfully.`,
          ]);
        }
      },
      onError: (error) => {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          "AI: Sorry, something went wrong.",
        ]);
      },
    }
  );

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
    mutation.mutate(message);
  };

  return { messages, sendMessage };
};