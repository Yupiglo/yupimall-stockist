import { Delivery } from "@/types";

export const mockDeliveries: Delivery[] = [
  {
    id: "#DEL-7782",
    location: "New York, USA",
    customer: "Alice Johnson",
    courier: "John Doe",
    status: "In Transit",
    statusColor: "info",
    time: "Expected in 2h",
  },
  {
    id: "#DEL-7781",
    location: "Los Angeles, USA",
    customer: "Mark Spencer",
    courier: "Jane Smith",
    status: "Delivered",
    statusColor: "success",
    time: "30 mins ago",
  },
  {
    id: "#DEL-7780",
    location: "Chicago, USA",
    customer: "Elena Gomez",
    courier: "Mike Tyson",
    status: "Picked Up",
    statusColor: "warning",
    time: "1 hour ago",
  },
];
