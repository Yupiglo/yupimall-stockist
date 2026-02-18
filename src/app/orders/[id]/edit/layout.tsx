import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Order | YupiFlow Stockist",
  description: "Edit order information.",
};

export default function EditOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
