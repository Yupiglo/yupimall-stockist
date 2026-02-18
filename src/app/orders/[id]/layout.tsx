import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Detail | YupiFlow Stockist",
  description: "View order details.",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
