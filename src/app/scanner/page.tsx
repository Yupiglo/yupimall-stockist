"use client";

import React, { useState, useContext } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
    Alert,
    CircularProgress,
    Divider,
    Card,
    CardContent,
    Chip,
} from "@mui/material";
import {
    QrCodeScanner as ScannerIcon,
    Search as SearchIcon,
    CheckCircle as CheckIcon,
    Error as ErrorIcon,
} from "@mui/icons-material";
import axiosInstance from "@/lib/axios";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

export default function ScannerPage() {
    const [trackingCode, setTrackingCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { selectedCurr } = useContext(CurrencyContext);

    const formatPrice = (priceUSD: number) => {
        const converted = priceUSD * selectedCurr.value;
        if (selectedCurr.symbol === "FCFA" || selectedCurr.symbol === "₦") {
            return `${Math.round(converted).toLocaleString()} ${selectedCurr.symbol}`;
        }
        return `${selectedCurr.symbol}${converted.toFixed(2)}`;
    };

    const handleSearch = async (e?: any) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!trackingCode.trim()) return;

        setLoading(true);
        setError(null);
        setOrder(null);
        setSuccess(null);

        try {
            const response = await axiosInstance.get(`orders/search/${trackingCode}`);
            if (response.data.message === "success" && response.data.order) {
                setOrder(response.data.order);
            } else {
                setError("Commande non trouvée.");
            }
        } catch (err: any) {
            console.error("Search error:", err);
            setError(err.response?.data?.message || "Erreur lors de la recherche.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeliver = async () => {
        if (!order) return;

        setLoading(true);
        try {
            const response = await axiosInstance.put(`orders/${order.id}/status`, {
                status: "delivered",
            });
            if (response.data.message === "success") {
                setSuccess("Commande marquée comme livrée avec succès !");
                setOrder(null);
                setTrackingCode("");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur lors de la livraison.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h4" fontWeight="900" gutterBottom>
                Scanner de Livraison
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Saisissez le code de suivi ou scannez le QR code pour valider la remise au client.
            </Typography>

            <Paper
                component="form"
                onSubmit={handleSearch}
                sx={{
                    p: 3,
                    borderRadius: 4,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        label="Code de suivi (ex: YUPI-XYZ-123)"
                        value={trackingCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrackingCode(e.target.value)}
                        disabled={loading}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => handleSearch()}
                        disabled={loading || !trackingCode.trim()}
                        startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                    >
                        Rechercher
                    </Button>
                </Stack>
            </Paper>

            {error && (
                <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 3, borderRadius: 3 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" icon={<CheckIcon />} sx={{ mb: 3, borderRadius: 3 }}>
                    {success}
                </Alert>
            )}

            {order && (
                <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
                    <CardContent sx={{ p: 4 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                            <Box>
                                <Typography variant="overline" color="text.secondary" fontWeight="700">
                                    Commande
                                </Typography>
                                <Typography variant="h5" fontWeight="900">
                                    {order.tracking_code}
                                </Typography>
                            </Box>
                            <Chip
                                label={order.status.toUpperCase()}
                                color={order.status === "reached_stockist" ? "primary" : "default"}
                                sx={{ fontWeight: "800" }}
                            />
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={2} sx={{ mb: 4 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight="700">
                                    CLIENT
                                </Typography>
                                <Typography variant="body1" fontWeight="700">
                                    {order.user_name || order.customer || "Inconnu"}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight="700">
                                    TOTAL
                                </Typography>
                                <Typography variant="h6" color="primary.main" fontWeight="900">
                                    {formatPrice(order.total || 0)}
                                </Typography>
                            </Box>
                        </Stack>

                        {order.status === "reached_stockist" ? (
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                color="success"
                                onClick={handleDeliver}
                                disabled={loading}
                                sx={{ py: 2, borderRadius: 3, fontWeight: "900", fontSize: "1.1rem" }}
                                startIcon={<CheckIcon />}
                            >
                                CONFIRMER LA LIVRAISON CLIENT
                            </Button>
                        ) : (
                            <Alert severity="warning" sx={{ borderRadius: 3 }}>
                                Cette commande n'est pas encore prête pour la livraison client (Statut actuel: {order.status}).
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            )}

            <Box sx={{ mt: 8, textAlign: "center", opacity: 0.5 }}>
                <ScannerIcon sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="caption" display="block">
                    SIMULATEUR DE SCANNER V1.0
                </Typography>
            </Box>
        </Box>
    );
}
