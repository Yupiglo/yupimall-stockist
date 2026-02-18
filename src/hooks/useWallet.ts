"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";

interface WalletData {
    id: number;
    balance: string;
    currency: string;
}

interface WalletTransaction {
    id: number;
    type: string;
    amount: string;
    description: string | null;
    reference_type: string;
    reference_id: number | null;
    balance_before: string;
    balance_after: string;
    created_at: string;
}

interface WalletPin {
    id: number;
    code: string;
    amount: string;
    amount_used: string;
    status: "active" | "used" | "expired";
    expires_at: string;
    used_at: string | null;
    created_at: string;
}

interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

export function useWalletBalance() {
    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("wallet/balance");
            setWallet(res.data.wallet);
        } catch (err) {
            setError("Impossible de charger le wallet");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetch(); }, [fetch]);
    return { wallet, loading, error, refresh: fetch };
}

export function useWalletTransactions(page = 1, perPage = 20) {
    const [transactions, setTransactions] = useState<PaginatedResponse<WalletTransaction> | null>(null);
    const [loading, setLoading] = useState(true);

    const fetch = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("wallet/transactions", { params: { page, per_page: perPage } });
            setTransactions(res.data.transactions);
        } catch {
            setTransactions(null);
        } finally {
            setLoading(false);
        }
    }, [page, perPage]);

    useEffect(() => { fetch(); }, [fetch]);
    return { transactions, loading, refresh: fetch };
}

export function useWalletPins(page = 1, perPage = 20) {
    const [pins, setPins] = useState<PaginatedResponse<WalletPin> | null>(null);
    const [loading, setLoading] = useState(true);

    const fetch = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("wallet/pins/history", { params: { page, per_page: perPage } });
            setPins(res.data.pins);
        } catch {
            setPins(null);
        } finally {
            setLoading(false);
        }
    }, [page, perPage]);

    useEffect(() => { fetch(); }, [fetch]);
    return { pins, loading, refresh: fetch };
}

export async function generatePin(amount: number): Promise<{ code: string; amount: string; expires_at: string }> {
    const res = await axiosInstance.post("wallet/pins/generate", { amount });
    return res.data.pin;
}
