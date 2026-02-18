import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Distributor | YupiFlow Stockist",
  description: "Edit distributor information.",
};

export default function DistributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
