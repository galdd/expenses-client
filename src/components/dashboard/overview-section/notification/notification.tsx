import { NotificationExpense } from "./notification-expense";
import { NotificationInvitation } from "./notification-invitation";
import { NotificationList } from "./notification-list";
import "./notification.css";
import { NotificationType } from "../../../../@types/notification-props";

type Props = {
  notifications: NotificationType[];
};

export const Notification = ({ notifications }: Props) => {
  return (
    <div className="notifications-container">
      {notifications.map((notification, index) => {
        const key = `${notification.type}-${notification.props.id}-${index}`;
        if (notification.type === "expense") {
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
                listName={listName}
                price={price}
                timestamp={timestamp}
                action={action}
                creatorName={creatorName}
              />
            </div>
          );
        } else if (notification.type === "invitation") {
          const { id, avatarSrc, listName, responses, timestamp, creatorName } =
            notification.props;
          return (
            <div className="notification-item" key={key}>
              <NotificationInvitation
                id={id}
                avatarSrc={avatarSrc}
                listName={listName}
                responses={responses}
                timestamp={timestamp}
                creatorName={creatorName}
              />
            </div>
          );
        } else if (notification.type === "list") {
          const { id, avatarSrc, listName, timestamp, action, creatorName } =
            notification.props;
          return (
            <div className="notification-item" key={key}>
              <NotificationList
                id={id}
                avatarSrc={avatarSrc}
                listName={listName}
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
