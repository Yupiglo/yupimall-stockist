import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Courier | YupiFlow Stockist",
  description: "View courier profile.",
};

export default function CourierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
