import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
    title: "Orders | Yupiflow Stockist",
    description: "Manage and track orders.",
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
