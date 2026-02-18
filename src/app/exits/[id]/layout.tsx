import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Exit | YupiFlow Stockist",
  description: "View exit information.",
};

export default function ExitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
