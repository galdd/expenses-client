import { useState } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { apiFetch } from "../../api";

interface DialogFlowResponse {
  response: string;
  intent: string;
  parameters: any;
  list?: any;
  error?: string; // הוספת שדה לשגיאות
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
    const errorText = await response.text();
    throw new Error(`Server error: ${response.statusText}\n${errorText}`);
  }

  const data = await response.json();
  console.log("Response from DialogFlow server:", data);
  return data;
};

export const useDialogFlow = (
  onCreateList: (list: any) => void,
  onUpdateList: (listId: string, name: string) => void,
  onDeleteList: (listId: string) => void
) => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([
    { text: "Hello, I am AI. How can I help you?", sender: "AI" },
  ]);
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const token = await getAccessTokenSilently();
      return sendToDialogFlow(message, token);
    },
    onSuccess: (data) => {
      console.log("Mutation success:", data);
      if (data && data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, sender: "AI" },
        ]);

        if (data.intent === "create_list" && data.parameters?.listName && data.list) {
          console.log("New list created:", data.list);
          onCreateList(data.list);
        } else if (data.intent === "update_list" && data.list) {
          console.log("List updated:", data.list);
          onUpdateList(data.list._id, data.list.name);
        } else if (data.intent === "delete_list" && data.listId) {
          console.log("List deleted:", data.listId);
          onDeleteList(data.listId);
        }
      } else {
        throw new Error("Invalid response structure");
      }
    },
    onError: (error) => {
      const errorMessage = error.message || "AI: Sorry, something went wrong.";
      const errorParts = error.message.split('\n');
     
      const parsedError = JSON.parse(errorParts[1]);
      console.log(parsedError);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `AI: ${parsedError.response}`, sender: "AI" },
      ]);
    },
  });

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: "User" }]);
    mutation.mutate(message);
  };

  return { messages, sendMessage, isLoading: mutation.isLoading, error: mutation.error };
};

export default useDialogFlow;