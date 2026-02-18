import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Entry | YupiFlow Stockist",
  description: "View entry information.",
};

export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
