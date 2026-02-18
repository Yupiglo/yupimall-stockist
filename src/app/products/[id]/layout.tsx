import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail | YupiFlow Stockist",
  description: "View product details.",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
