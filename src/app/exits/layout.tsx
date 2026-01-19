import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Stock Exits | YupiFlow Stockist",
  description: "Manage and track outgoing inventory.",
};

export default function ExitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
