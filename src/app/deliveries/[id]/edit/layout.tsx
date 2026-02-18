import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Delivery | YupiFlow Stockist",
  description: "Edit delivery information.",
};

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
