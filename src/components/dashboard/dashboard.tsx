import { OverviewSection } from "./overview-section";
import { ExpenseListSection } from "./expense-list-section";
import ChatWindow from "../shared/ChatWindow/ChatWindow";
import "./dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <OverviewSection />
      <ExpenseListSection />
      <ChatWindow />
    </div>
  );
};

export default Dashboard;