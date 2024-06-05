import { NotificationType } from "../../../../@types/notification";

export const notifications: NotificationType[] = [
  {
    type: "expense",
    props: {
      id: "12341",
      avatarSrc: "",
      expenseDescription: "Coffee",
      listName: "Office Expenses",
      price: 100,
    },
  },
  {
    type: "invitation",
    props: {
      id: "12349",
      avatarSrc: "",
      listName: "Project X",
      responses: [{ accepted: true }, { accepted: false }],
    },
  },
  {
    type: "expense",
    props: {
      id: "12342",
      avatarSrc: "",
      expenseDescription: "Groceries",
      listName: "Office Expenses",
      price: 100,
    },
  },
  {
    type: "invitation",
    props: {
      id: "12343",
      avatarSrc: "",
      listName: "Project X",
      responses: [{ accepted: true }, { accepted: false }],
    },
  },
  {
    type: "expense",
    props: {
      id: "12344",
      avatarSrc: "",
      expenseDescription: "Utilities",
      listName: "Office Expenses",
      price: 100,
    },
  },
  {
    type: "invitation",
    props: {
      id: "12347",
      avatarSrc: "",
      listName: "Project X",
      responses: [{ accepted: true }, { accepted: false }],
    },
  },
  {
    type: "invitation",
    props: {
      id: "12327",
      avatarSrc: "",
      listName: "Project Y",
      responses: [{ accepted: true }, { accepted: false }],
    },
  },
  {
    type: "expense",
    props: {
      id: "22341",
      avatarSrc: "",
      expenseDescription: "Coffee",
      listName: "Office Expenses",
      price: 100,
    },
  },
  {
    type: "invitation",
    props: {
      id: "22349",
      avatarSrc: "",
      listName: "Project X",
      responses: [{ accepted: true }, { accepted: false }],
    },
  },
  {
    type: "expense",
    props: {
      id: "22342",
      avatarSrc: "",
      expenseDescription: "Groceries",
      listName: "Office Expenses",
      price: 100,
    },
  },
  {
    type: "invitation",
    props: {
      id: "22343",
      avatarSrc: "",
      listName: "Project X",
      responses: [{ accepted: true }, { accepted: false }],
    },
  },
  {
    type: "expense",
    props: {
      id: "32344",
      avatarSrc: "",
      expenseDescription: "Utilities",
      listName: "Office Expenses",
      price: 100,
    },
  },
];
