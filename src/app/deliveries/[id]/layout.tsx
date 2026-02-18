import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Delivery | YupiFlow Stockist",
  description: "View delivery information.",
};

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
