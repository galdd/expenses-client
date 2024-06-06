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

    socket.on("clear_notifications", () => {
      setNotifications([]);
    });

    return () => {
      socket.off("notification");
      socket.off("clear_notifications");
    };
  }, [setNotifications]);

  return { socket };
};
