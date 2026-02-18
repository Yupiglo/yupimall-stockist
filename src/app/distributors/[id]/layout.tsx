import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Distributor | YupiFlow Stockist",
  description: "View distributor information.",
};

export default function DistributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
