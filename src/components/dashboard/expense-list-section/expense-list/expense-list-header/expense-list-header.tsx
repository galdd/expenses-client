import { useState } from "react";
import { Dropdown, Modal, Input, message } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  DeleteFilled,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import "./expense-list-header.css";
import { ExpenseListHeaderProps } from "../../../../../@types/expense-list-prop";
import { useUpdateExpenseList } from "../../../../hooks/useExpenseLists";

export const ExpenseListHeader: React.FC<ExpenseListHeaderProps> = ({
  listId,
  listName,
  expenseTotal,
  onDelete,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newListName, setNewListName] = useState(listName);

  const { mutate: updateExpenseList } = useUpdateExpenseList();

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    updateExpenseList(
      { id: listId, name: newListName },
      {
        onSuccess: () => {
          message.success("List updated successfully");
          setIsEditModalVisible(false);
        },
        onError: (error) => {
          message.error(`Failed to update list: ${error.message}`);
        },
      }
    );
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const items = [
    {
      key: "invite",
      icon: <UserOutlined />,
      label: "Invite",
    },
    {
      key: "permissions",
      icon: <SettingOutlined />,
      label: "Permissions",
    },
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit List",
      className: "menu-edit",
      onClick: () => {
        if (!listId) {
          message.error("Invalid list ID");
          return;
        }
        handleEdit();
      },
    },
    {
      key: "delete",
      icon: <DeleteFilled />,
      label: "Remove List",
      className: "menu-remove",
      onClick: () => {
        if (!listId) {
          message.error("Invalid list ID");
          return;
        }
        onDelete(listId);
      },
    },
  ];

  return (
    <div className="expense-list-header">
      <div className="list-name-and-price">
        <h2 className="list-name">{listName || "List"}</h2>
      </div>

      <div className="list-header-actions">
        <div className="total-price">{expenseTotal + "$" || "0"}</div>
        <div className="list-options-icon">
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <MoreOutlined />
          </Dropdown>
        </div>
      </div>

      <Modal
        title="Edit List Name"
        open={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Input
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
      </Modal>
    </div>
  );
};
