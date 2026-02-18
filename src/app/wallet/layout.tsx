import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
    title: "Wallet — YupiFlow Stockist",
    description: "Gérer votre wallet et vos PINs",
};

export default function WalletLayout({ children }: { children: React.ReactNode }) {
    return <AppShell>{children}</AppShell>;
}
