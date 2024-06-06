import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../api";
import { NotificationType } from "../../@types/notification-props";

const fetchNotifications = async (
  token: string
): Promise<NotificationType[]> => {
  const init = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await apiFetch("/api/notifications", init);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const clearNotificationsOnServer = async (token: string) => {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await apiFetch("/api/notifications/clear", init);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (error) {
        console.error("Error fetching the access token", error);
      }
    })();
  }, [getAccessTokenSilently]);

  const { data, isLoading, error } = useQuery<NotificationType[], Error>({
    queryKey: ["notifications", token],
    queryFn: () => fetchNotifications(token!),
    enabled: !!token,
  });

  const clearNotificationsMutation = useMutation<void, Error>({
    mutationFn: () => clearNotificationsOnServer(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    setNotifications: (
      newNotifications: React.SetStateAction<NotificationType[]>
    ) => {
      queryClient.setQueryData(["notifications", token], newNotifications);
    },
    clearNotifications: clearNotificationsMutation.mutate,
  };
};
