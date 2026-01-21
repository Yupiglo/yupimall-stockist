import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register | YupiFlow Stockist",
    description: "Join our network of stockists.",
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
