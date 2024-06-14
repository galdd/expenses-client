import { OverviewSection } from "./overview-section";
import { ExpenseListSection } from "./expense-list-section";
import ChatWindow from "../shared/ChatWindow/ChatWindow";
import "./dashboard.css";
import { useQueryClient } from "@tanstack/react-query";

export const Dashboard = () => {
  const queryClient = useQueryClient();

  const handleCreateList = () => {
    console.log("List created"); // Log to check function execution
    queryClient.invalidateQueries({ queryKey: ["expenseLists"] });
    queryClient.invalidateQueries({ queryKey: ["stats"] });
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  return (
    <div className="dashboard">
      <OverviewSection />
      <ExpenseListSection />
      <ChatWindow onCreateList={handleCreateList} />
    </div>
  );
};

export default Dashboard;