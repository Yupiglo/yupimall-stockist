import { Order } from "@/types";

export const mockOrders: Order[] = [
  {
    id: "#ORD-9921",
    customer: "Alice Johnson",
    status: "Completed",
    amount: "$450.00",
    date: "2024-01-15",
  },
  {
    id: "#ORD-9920",
    customer: "Mark Spencer",
    status: "Pending",
    amount: "$1,200.50",
    date: "2024-01-15",
  },
  {
    id: "#ORD-9919",
    customer: "Elena Gomez",
    status: "In Progress",
    amount: "$89.99",
    date: "2024-01-14",
  },
  {
    id: "#ORD-9918",
    customer: "George Taylor",
    status: "Completed",
    amount: "$560.00",
    date: "2024-01-14",
  },
  {
    id: "#ORD-9917",
    customer: "Sophia Wang",
    status: "Cancelled",
    amount: "$120.00",
    date: "2024-01-13",
  },
];
