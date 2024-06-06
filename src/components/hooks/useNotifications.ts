import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

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

  const setNotifications = (newNotifications: NotificationType[]) => {
    queryClient.setQueryData(["notifications", token], newNotifications);
  };

  return { data, isLoading, error, setNotifications };
};
