"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";

export interface StockEntry {
    id: number;
    product: string;
    product_name?: string;
    sku?: string;
    quantity: number;
    supplier?: string;
    distributor_name?: string;
    date: string;
    created_at?: string;
    notes?: string;
}

export interface StockExit {
    id: number;
    product: string;
    product_name?: string;
    sku?: string;
    quantity: number;
    destination?: string;
    reason?: string;
    date: string;
    created_at?: string;
    notes?: string;
}

export function useStockEntries() {
    const [entries, setEntries] = useState<StockEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get("stock/entries");
            const data = response.data?.entries?.data || response.data?.entries || response.data?.data || response.data || [];
            setEntries(Array.isArray(data) ? data : []);
        } catch (err: any) {
            console.error("Error fetching stock entries:", err);
            setError(err?.response?.data?.message || "Impossible de charger les entrées de stock");
        } finally {
            setLoading(false);
        }
    }, []);

    const createEntry = async (data: { product_id: number; quantity: number; supplier?: string; notes?: string }) => {
        const response = await axiosInstance.post("stock/entries", data);
        await fetch();
        return response.data;
    };

    useEffect(() => { fetch(); }, [fetch]);

    return { entries, loading, error, refresh: fetch, createEntry };
}

export function useStockExits() {
    const [exits, setExits] = useState<StockExit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get("stock/exits");
            const data = response.data?.exits?.data || response.data?.exits || response.data?.data || response.data || [];
            setExits(Array.isArray(data) ? data : []);
        } catch (err: any) {
            console.error("Error fetching stock exits:", err);
            setError(err?.response?.data?.message || "Impossible de charger les sorties de stock");
        } finally {
            setLoading(false);
        }
    }, []);

    const createExit = async (data: { product_id: number; quantity: number; reason?: string; destination?: string; notes?: string }) => {
        const response = await axiosInstance.post("stock/exits", data);
        await fetch();
        return response.data;
    };

    useEffect(() => { fetch(); }, [fetch]);

    return { exits, loading, error, refresh: fetch, createExit };
}
