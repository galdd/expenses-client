import { useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { apiFetch } from "../../api";

interface DialogFlowResponse {
  response: string;
  intent: string;
  parameters: any;
}

const sendToDialogFlow = async (message: string, token: string): Promise<DialogFlowResponse> => {
  const response = await apiFetch("/api/dialogflow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const token = await getAccessTokenSilently();
      return sendToDialogFlow(message, token);
    },
    onSuccess: (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, sender: "AI" },
      ]);

      if (data.intent === "create_list" && data.parameters.listName) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `List "${data.parameters.listName}" created successfully.`, sender: "AI" },
        ]);
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "AI: Sorry, something went wrong.", sender: "AI" },
      ]);
    },
  });

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: "User" }]);
    mutation.mutate(message);
  };

  return { messages, sendMessage };
};

export default useDialogFlow;