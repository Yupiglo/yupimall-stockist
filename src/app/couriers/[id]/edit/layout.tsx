import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Courier | YupiFlow Stockist",
  description: "Edit courier information.",
};

export default function CourierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
