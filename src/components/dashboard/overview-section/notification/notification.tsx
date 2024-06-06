import { NotificationExpense } from "./notification-expense";
import { NotificationInvitation } from "./notification-invitation";
import { NotificationList } from "./notification-list";
import {
  InvitationNotificationProps,
  ListNotificationProps,
  NotificationExpenseProps,
  NotificationType,
} from "../../../../@types/notification-props";
import "./notification.css";

interface NotificationProps {
  notifications: NotificationType[];
}

const isExpenseNotification = (
  notification: NotificationType
): notification is { type: "expense"; props: NotificationExpenseProps } => {
  return notification.type === "expense";
};

const isInvitationNotification = (
  notification: NotificationType
): notification is {
  type: "invitation";
  props: InvitationNotificationProps;
} => {
  return notification.type === "invitation";
};

const isListNotification = (
  notification: NotificationType
): notification is { type: "list"; props: ListNotificationProps } => {
  return notification.type === "list";
};

const hasNameProperty = (obj: unknown): obj is { name: string } => {
  return typeof obj === "object" && obj !== null && "name" in obj;
};

export const Notification = ({ notifications }: NotificationProps) => {
  console.log("Rendering notifications:", notifications);
  return (
    <div className="notifications-container">
      {notifications.map((notification, index) => {
        const key = `${notification.type}-${notification.props.id}-${index}`;
        if (isExpenseNotification(notification)) {
          const {
            id,
            avatarSrc,
            expenseDescription,
            listName,
            price,
            timestamp,
            action,
            creatorName,
          } = notification.props;
          return (
            <div className="notification-item" key={key}>
              <NotificationExpense
                id={id}
                avatarSrc={avatarSrc}
                expenseDescription={expenseDescription}
                listName={hasNameProperty(listName) ? listName.name : listName}
                price={price}
                timestamp={timestamp}
                action={action}
                creatorName={creatorName}
              />
            </div>
          );
        } else if (isInvitationNotification(notification)) {
          const { id, avatarSrc, listName, responses, timestamp, creatorName } =
            notification.props;
          return (
            <div className="notification-item" key={key}>
              <NotificationInvitation
                id={id}
                avatarSrc={avatarSrc}
                listName={hasNameProperty(listName) ? listName.name : listName}
                responses={responses}
                timestamp={timestamp}
                creatorName={creatorName}
              />
            </div>
          );
        } else if (isListNotification(notification)) {
          const { id, avatarSrc, listName, timestamp, action, creatorName } =
            notification.props;
          return (
            <div className="notification-item" key={key}>
              <NotificationList
                id={id}
                avatarSrc={avatarSrc}
                listName={hasNameProperty(listName) ? listName.name : listName}
                timestamp={timestamp}
                action={action}
                creatorName={creatorName}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
