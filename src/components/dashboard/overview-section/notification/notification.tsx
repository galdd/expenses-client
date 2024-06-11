import { NotificationExpense } from "./notification-expense";
import { NotificationInvitation } from "./notification-invitation";
import { NotificationList } from "./notification-list";
import { NotificationType } from "../../../../@types/notification-props";
import "./notification.css";

interface NotificationProps {
  notifications: NotificationType[];
}

export const Notification = ({ notifications }: NotificationProps) => {
  console.log("Rendering notifications:", notifications);
  return (
    <div className="notifications-container">
      {notifications.map((notification, index) => {
        const key = `${notification.type}-${notification.props?.id || notification.id}-${index}`;

        if (notification.type === "expense" && notification.props) {
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
                listName={typeof listName === "object" ? (listName as any).name : listName}
                price={price}
                timestamp={timestamp}
                action={action}
                creatorName={creatorName}
              />
            </div>
          );
        } else if (notification.type === "invitation" && notification.props) {
          const { id, avatarSrc, listName, responses, timestamp, creatorName } = notification.props;
          return (
            <div className="notification-item" key={key}>
              <NotificationInvitation
                id={id}
                avatarSrc={avatarSrc}
                listName={typeof listName === "object" ? (listName as any).name : listName}
                responses={responses}
                timestamp={timestamp}
                creatorName={creatorName}
              />
            </div>
          );
        } else if (notification.type === "list" && notification.props) {
          const { id, avatarSrc, listName, timestamp, action, creatorName } = notification.props;
          return (
            <div className="notification-item" key={key}>
              <NotificationList
                id={id}
                avatarSrc={avatarSrc}
                listName={typeof listName === "object" ? (listName as any).name : listName}
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
