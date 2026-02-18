"use client";

import { Box, Grid, Card, CardContent, Typography, Stack, Chip, CircularProgress, Button, Alert } from "@mui/material";
import {
    AccountBalanceWallet as WalletIcon,
    Pin as PinIcon,
    Receipt as ReceiptIcon,
    Add as AddIcon,
    Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useWalletBalance, useWalletTransactions, useWalletPins } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { LinksEnum } from "@/utilities/pagesLinksEnum";

export default function WalletDashboard() {
    const router = useRouter();
    const { wallet, loading: walletLoading, error: walletError, refresh: refreshWallet } = useWalletBalance();
    const { transactions, loading: txLoading } = useWalletTransactions(1, 5);
    const { pins, loading: pinsLoading } = useWalletPins(1, 5);

    if (walletLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    const activePins = pins?.data?.filter((p) => p.status === "active").length || 0;

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={900}>Wallet</Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={refreshWallet}
                        sx={{ borderRadius: 3, fontWeight: 700, textTransform: "none" }}
                    >
                        Rafraîchir
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => router.push(LinksEnum.walletGenerate)}
                        sx={{ borderRadius: 3, fontWeight: 700, px: 3, py: 1.5, textTransform: "none" }}
                    >
                        Générer un PIN
                    </Button>
                </Stack>
            </Stack>

            {walletError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {walletError}
                </Alert>
            )}

            {/* Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", borderRadius: 4 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>Solde disponible</Typography>
                                    <Typography variant="h3" fontWeight={900}>
                                        ${wallet ? parseFloat(wallet.balance).toLocaleString() : "0"}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>{wallet?.currency || "USD"}</Typography>
                                </Box>
                                <WalletIcon sx={{ fontSize: 56, opacity: 0.3 }} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card sx={{ borderRadius: 4, height: "100%" }}>
                        <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "success.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <PinIcon sx={{ color: "white" }} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" fontWeight={900}>{activePins}</Typography>
                                    <Typography variant="body2" color="text.secondary">PINs actifs</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card sx={{ borderRadius: 4, height: "100%" }}>
                        <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "info.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <ReceiptIcon sx={{ color: "white" }} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" fontWeight={900}>{transactions?.total || 0}</Typography>
                                    <Typography variant="body2" color="text.secondary">Transactions totales</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                {/* Recent Transactions */}
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Card sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                <Typography variant="h6" fontWeight={800}>Transactions récentes</Typography>
                                <Button size="small" onClick={() => router.push(LinksEnum.walletTransactions)} sx={{ textTransform: "none", fontWeight: 700 }}>
                                    Voir tout
                                </Button>
                            </Stack>
                            {txLoading ? (
                                <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress size={24} /></Box>
                            ) : !transactions?.data?.length ? (
                                <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>Aucune transaction</Typography>
                            ) : (
                                <Stack spacing={2}>
                                    {transactions.data.map((tx) => (
                                        <Stack key={tx.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                                            <Box>
                                                <Typography variant="body2" fontWeight={700}>{tx.description || tx.reference_type}</Typography>
                                                <Typography variant="caption" color="text.secondary">{new Date(tx.created_at).toLocaleString()}</Typography>
                                            </Box>
                                            <Typography variant="body2" fontWeight={800} color={tx.type === "debit" ? "error.main" : "success.main"}>
                                                {tx.type === "debit" ? "-" : "+"}${parseFloat(tx.amount).toFixed(2)}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent PINs */}
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Card sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                <Typography variant="h6" fontWeight={800}>PINs récents</Typography>
                                <Button size="small" onClick={() => router.push(LinksEnum.walletPins)} sx={{ textTransform: "none", fontWeight: 700 }}>
                                    Voir tout
                                </Button>
                            </Stack>
                            {pinsLoading ? (
                                <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress size={24} /></Box>
                            ) : !pins?.data?.length ? (
                                <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>Aucun PIN généré</Typography>
                            ) : (
                                <Stack spacing={2}>
                                    {pins.data.map((pin) => (
                                        <Stack key={pin.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                                            <Box>
                                                <Typography variant="body2" fontWeight={700} fontFamily="monospace" letterSpacing={2}>{pin.code}</Typography>
                                                <Typography variant="caption" color="text.secondary">${parseFloat(pin.amount).toFixed(2)} • {new Date(pin.created_at).toLocaleDateString()}</Typography>
                                            </Box>
                                            <Chip
                                                label={pin.status}
                                                size="small"
                                                color={pin.status === "active" ? "success" : pin.status === "used" ? "default" : "error"}
                                                sx={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}
                                            />
                                        </Stack>
                                    ))}
                                </Stack>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
