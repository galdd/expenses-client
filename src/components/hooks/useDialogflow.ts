import { useState } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { apiFetch } from "../../api";

interface DialogFlowResponse {
  response: string;
  intent: string;
  parameters: any;
  list?: any;
  lists?: any[];
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
  console.log("Response from DialogFlow server:", data);
  return data;
};

export const useDialogFlow = (
  onCreateList: (list: any) => void,
  onEdit: (listId: string, name: string) => void,
  onDelete: (listId: string) => void,
  onRead: (lists: any[]) => void
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

        switch (data.intent) {
          case "create_list":
            if (data.parameters?.listName && data.list) {
              console.log("New list created:", data.list);
              onCreateList(data.list);
            }
            break;
          case "update_list":
            if (data.list) {
              console.log("List updated:", data.list);
              onEdit(data.list._id, data.list.name);
            }
            break;
          case "delete_list":
            if (data.parameters?.listId) {
              console.log("List deleted:", data.parameters.listId.stringValue);
              onDelete(data.parameters.listId.stringValue);
            }
            break;
          case "read_list":
            if (data.lists) {
              console.log("Lists read:", data.lists);
              onRead(data.lists);
            }
            break;
          default:
            console.warn("Unhandled intent:", data.intent);
        }
      } else {
        throw new Error("Invalid response structure");
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

  return { messages, sendMessage, isLoading: mutation.isLoading, error: mutation.error };
};

export default useDialogFlow;