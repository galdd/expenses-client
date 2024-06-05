import {
  UserOutlined,
  UnorderedListOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { NotificationHeader } from "./notification/notification-header";
import { useStats } from "./useStats";
import { StatCard } from "./stat-card";
import { Notification } from "./notification";
import "./overview-section.css";
import { DataLoader } from "../../shared";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { NotificationType } from "../../../@types/notification-props";

const socket = io("http://localhost:1337");

export const OverviewSection = () => {
  const { data: stats, isLoading, error } = useStats();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    socket.on("notification", (data: NotificationType) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <DataLoader isLoading={isLoading} error={error}>
      <DataLoader.Loading> </DataLoader.Loading>
      <DataLoader.Error> </DataLoader.Error>
      <div className="overview-section">
        <div className="stats-cards">
          <StatCard
            icon={<CreditCardOutlined />}
            value={`${stats?.totalExpenses ?? "N/A"}`}
            label="Total Expenses"
            iconBackgroundColor="var(--icon-background-primary)"
            iconColor="var(--icon-primary)"
          />
          <StatCard
            icon={<UnorderedListOutlined />}
            value={`${stats?.totalLists ?? "N/A"}`}
            label="Lists"
            iconBackgroundColor="var(--icon-background-primary)"
            iconColor="var(--icon-primary)"
          />
          <StatCard
            icon={<UserOutlined />}
            value={`${stats?.totalUsers ?? "N/A"}`}
            label="Users"
            iconBackgroundColor="var(--icon-background-primary)"
            iconColor="var(--icon-primary)"
          />
          <StatCard
            icon={<DollarCircleOutlined />}
            value={`$${stats?.totalPrice?.toFixed(2) ?? "N/A"}`}
            label="Total Price"
            iconBackgroundColor="var(--icon-background-primary)"
            iconColor="var(--icon-primary)"
          />
        </div>
        <div className="notification-card">
          <NotificationHeader clearNotifications={clearNotifications} />
          <Notification notifications={notifications} />
        </div>
      </div>
    </DataLoader>
  );
};

export default OverviewSection;
