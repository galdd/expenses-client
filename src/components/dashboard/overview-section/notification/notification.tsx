import { notifications } from "./dummy-notification";
import { NotificationExpense } from "./notification-expense";
import { NotificationInvitation } from "./notification-invitation";

import "./notification.css";

export const Notification = () => (
  <div className="notifications-container">
    {notifications.map((notification) => {
      if (notification.type === "expense") {
        const { id, avatarSrc, expenseDescription, listName, price } =
          notification.props;
        return (
          <div className="notification-item" key={id}>
            <NotificationExpense
              id={id}
              avatarSrc={avatarSrc}
              expenseDescription={expenseDescription}
              listName={listName}
              price={price}
            />
          </div>
        );
      } else if (notification.type === "invitation") {
        const { id, avatarSrc, listName, responses } = notification.props;
        return (
          <div className="notification-item" key={id}>
            <NotificationInvitation
              avatarSrc={avatarSrc}
              listName={listName}
              responses={responses}
            />
          </div>
        );
      }
      return null;
    })}
  </div>
);
