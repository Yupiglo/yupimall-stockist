"use client";

import { useState } from "react";
import {
    Box, Typography, Card, CardContent, Stack, Chip, Button, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
} from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useWalletPins } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { LinksEnum } from "@/utilities/pagesLinksEnum";

const statusConfig: Record<string, { color: "success" | "default" | "error"; label: string }> = {
    active: { color: "success", label: "Actif" },
    used: { color: "default", label: "Utilisé" },
    expired: { color: "error", label: "Expiré" },
};

export default function PinHistoryPage() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const { pins, loading } = useWalletPins(page, 15);

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Button startIcon={<BackIcon />} onClick={() => router.push(LinksEnum.wallet)} sx={{ mb: 3, textTransform: "none", fontWeight: 700 }}>
                Retour au Wallet
            </Button>

            <Typography variant="h4" fontWeight={900} sx={{ mb: 4 }}>Historique des PINs</Typography>

            <Card sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress /></Box>
                    ) : !pins?.data?.length ? (
                        <Typography color="text.secondary" sx={{ textAlign: "center", py: 6 }}>Aucun PIN généré</Typography>
                    ) : (
                        <>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800 }}>Code</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Montant</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Utilisé</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Statut</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Créé le</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Expire le</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pins.data.map((pin) => {
                                            const cfg = statusConfig[pin.status] || statusConfig.expired;
                                            return (
                                                <TableRow key={pin.id} hover>
                                                    <TableCell>
                                                        <Typography fontFamily="monospace" fontWeight={700} letterSpacing={2}>{pin.code}</Typography>
                                                    </TableCell>
                                                    <TableCell>${parseFloat(pin.amount).toFixed(2)}</TableCell>
                                                    <TableCell>${parseFloat(pin.amount_used).toFixed(2)}</TableCell>
                                                    <TableCell>
                                                        <Chip label={cfg.label} color={cfg.color} size="small" sx={{ fontWeight: 700, fontSize: "0.7rem" }} />
                                                    </TableCell>
                                                    <TableCell>{new Date(pin.created_at).toLocaleString()}</TableCell>
                                                    <TableCell>{new Date(pin.expires_at).toLocaleString()}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={pins.total}
                                page={page - 1}
                                onPageChange={(_, p) => setPage(p + 1)}
                                rowsPerPage={pins.per_page}
                                rowsPerPageOptions={[]}
                            />
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
