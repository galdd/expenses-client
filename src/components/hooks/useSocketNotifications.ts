import { useEffect } from "react";
import { io } from "socket.io-client";
import { NotificationType } from "../../@types/notification-props";

const socket = io("http://localhost:1337");

export const useSocketNotifications = (
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>
) => {
  useEffect(() => {
    socket.on("notification", (data: NotificationType) => {
      console.log("Received notification from socket:", data);
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.off("notification");
    };
  }, [setNotifications]);

  return { socket };
};
